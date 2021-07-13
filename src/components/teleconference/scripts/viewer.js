import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import KinesisVideo from 'aws-sdk/clients/kinesisvideo';
import KinesisVideoSignalingChannels from 'aws-sdk/clients/kinesisvideosignalingchannels';
import config from "../../../../../tempConfig";
const startViewer = async (viewer) => {
  // const viewer = {
  //   signalingClient: null,
  //   localStream: null,
  //   localView: null,
  //   remoteView: null,
  //   dataChannel: null,
  //   peerConnectionStatsInterval: null,
  //   peerConnectionByClientId: {},
  //   dataChannelByClientId: [],
  //   receivedMessages: "",
  // };

  const role = "VIEWER";
  // Create KVS client
  console.log("Created KVS client...");
  const kinesisVideoClient = new KinesisVideo({
    region: config.region,
    endpoint: config.endpoint || null,
    correctClockSkew: true,
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretAccessKey,
    sessionToken: config.sessionToken || null,
  });

  // Get signaling channel ARN
  console.log("Getting signaling channel ARN...");
  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: config.channelName,
    })
    .promise();

  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
  console.log("[VIEWER] Channel ARN: ", channelARN);

  // Get signaling channel endpoints:
  console.log("Getting signaling channel endpoints...");
  const getSignalingChannelEndpointResponse = await kinesisVideoClient
    .getSignalingChannelEndpoint({
      ChannelARN: channelARN,
      SingleMasterChannelEndpointConfiguration: {
        Protocols: ["WSS", "HTTPS"],
        Role: role, //roleOption.MASTER
      },
    })
    .promise();

  const endpointsByProtocol =
    getSignalingChannelEndpointResponse.ResourceEndpointList.reduce(
      (endpoints, endpoint) => {
        endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
        return endpoints;
      },
      {}
    );
  console.log("[VIEWER] Endpoints: ", endpointsByProtocol);

  // Create Signaling Client
  console.log(`Creating signaling client...`);
  viewer.signalingClient = new SignalingClient({
    channelARN,
    channelEndpoint: endpointsByProtocol.WSS,
    role: role, //roleOption.MASTER
    region: config.region,
    systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    clientId: config.clientId,
    credentials: {
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretAccessKey,
      sessionToken: config.sessionToken || null,
    },
  });

  // Get ICE server configuration
  console.log("Creating ICE server configuration...");
  const kinesisVideoSignalingChannelsClient = new KinesisVideoSignalingChannels(
    {
      region: config.region,
      endpoint: endpointsByProtocol.HTTPS,
      correctClockSkew: true,
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretAccessKey,
      sessionToken: config.sessionToken || null,
    }
  );

  console.log("Getting ICE server config response...");
  const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
    .getIceServerConfig({
      ChannelARN: channelARN,
    })
    .promise();

  const iceServers = [];
  if (config.natTraversal === config.STUN_TURN) {
    console.log("Getting STUN servers...");
    iceServers.push({
      urls: `stun:stun.kinesisvideo.${config.region}.amazonaws.com:443`,
    });
  }

  if (config.natTraversal !== config.DISABLED) {
    console.log("Getting TURN servers...");
    getIceServerConfigResponse.IceServerList.forEach((iceServer) =>
      iceServers.push({
        urls: iceServer.Uris,
        username: iceServer.Username,
        credential: iceServer.Password,
      })
    );
  }

  const configuration = {
    iceServers,
    iceTransportPolicy:
      config.natTraversal === config.TURN_ONLY ? "relay" : "all",
  };

  const resolution =
    config.resolution === config.WIDESCREEN
      ? { width: { ideal: 1280 }, height: { ideal: 720 } }
      : { width: { ideal: 640 }, height: { ideal: 480 } };

  const constraints = {
    video: config.sendVideo ? resolution : false,
    audio: config.sendAudio,
  };

  viewer.peerConnection = new RTCPeerConnection(configuration);
  if (viewer.openDataChannel) {
    console.log(`Opened data channel with MASTER.`);
    viewer.dataChannel =
      viewer.peerConnection.createDataChannel("kvsDataChannel");
    viewer.peerConnection.ondatachannel = (event) => {
      event.channel.onmessage = (message) => {
        const timestamp = new Date().toISOString();
        const loggedMessage = `${timestamp} - from MASTER: ${message.data}\n`;
        console.log(loggedMessage);
        viewer.receivedMessages += loggedMessage;
      };
    };
  }

  // Poll for connection stats
  viewer.peerConnectionStatsInterval = setInterval(() => {
    viewer.peerConnection.getStats().then(stats => console.log(stats));
  }, 1000);

  /// REVIEW BELOW HERE

  viewer.signalingClient.on("open", async () => {
    console.log("[VIEWER] Connected to signaling service");

    // Get a stream from the webcam, add it to the peer connection, and display it in the local view.
    // If no video/audio needed, no need to request for the sources.
    // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
    if (config.sendVideo || config.sendAudio) {
      try {
        viewer.localStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        viewer.localStream
          .getTracks()
          .forEach((track) =>
            viewer.peerConnection.addTrack(track, viewer.localStream)
          );
        viewer.localView.current.srcObject = viewer.localStream;
      } catch (e) {
        console.log(e)
        console.error("[VIEWER] Could not find webcam");
        return;
      }
    }

    // Create an SDP offer to send to the master
    console.log("[VIEWER] Creating SDP offer");
    await viewer.peerConnection.setLocalDescription(
      await viewer.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
    );

    // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
    if (config.useTrickleICE) {
      console.log("[VIEWER] Sending SDP offer");
      viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
    }
    console.log("[VIEWER] Generating ICE candidates");
  });

  viewer.signalingClient.on("sdpAnswer", async (answer) => {
    // Add the SDP answer to the peer connection
    console.log("[VIEWER] Received SDP answer");
    await viewer.peerConnection.setRemoteDescription(answer);
  });

  viewer.signalingClient.on("iceCandidate", (candidate) => {
    // Add the ICE candidate received from the MASTER to the peer connection
    console.log("[VIEWER] Received ICE candidate");
    viewer.peerConnection.addIceCandidate(candidate);
  });

  viewer.signalingClient.on("close", () => {
    console.log("[VIEWER] Disconnected from signaling channel");
  });

  viewer.signalingClient.on("error", (error) => {
    console.error("[VIEWER] Signaling client error: ", error);
  });

  // Send any ICE candidates to the other peer
  viewer.peerConnection.addEventListener("icecandidate", ({ candidate }) => {
    if (candidate) {
      console.log("[VIEWER] Generated ICE candidate");

      // When trickle ICE is enabled, send the ICE candidates as they are generated.
      if (config.useTrickleICE) {
        console.log("[VIEWER] Sending ICE candidate");
        viewer.signalingClient.sendIceCandidate(candidate);
      }
    } else {
      console.log("[VIEWER] All ICE candidates have been generated");

      // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
      if (!config.useTrickleICE) {
        console.log("[VIEWER] Sending SDP offer");
        viewer.signalingClient.sendSdpOffer(
          viewer.peerConnection.localDescription
        );
      }
    }
  });

  // As remote tracks are received, add them to the remote view
  viewer.peerConnection.addEventListener("track", (event) => {
    console.log("[VIEWER] Received remote track");
    if (viewer.remoteView.current.srcObject) {
      return;
    }
    viewer.remoteStream = event.streams[0];
    viewer.remoteView.current.srcObject = viewer.remoteStream;
  });

  console.log("[VIEWER] Starting viewer connection");
  viewer.signalingClient.open();
};

const stopViewer = (viewer) => {
  console.log("[VIEWER] Stopping viewer connection");
  if (viewer.signalingClient) {
    viewer.signalingClient.close();
    viewer.signalingClient = null;
  }

  if (viewer.peerConnection) {
    viewer.peerConnection.close();
    viewer.peerConnection = null;
  }

  if (viewer.localStream) {
    viewer.localStream.getTracks().forEach((track) => track.stop());
    viewer.localStream = null;
  }

  if (viewer.remoteStream) {
    viewer.remoteStream.getTracks().forEach((track) => track.stop());
    viewer.remoteStream = null;
  }

  if (viewer.peerConnectionStatsInterval) {
    clearInterval(viewer.peerConnectionStatsInterval);
    viewer.peerConnectionStatsInterval = null;
  }

  if (viewer.localView) {
    viewer.localView.current.srcObject = null;
  }

  if (viewer.remoteView) {
    viewer.remoteView.current.srcObject = null;
  }

  if (viewer.dataChannel) {
    viewer.dataChannel = null;
  }
};

const sendViewerMessage = (viewer, message) => {
  if (viewer.dataChannel) {
    try {
      viewer.dataChannel.send(message);
      console.log(`Message sent to master: ${message}`);
    } catch (e) {
      console.error("[VIEWER] Send DataChannel: ", e.toString());
    }
  }
};

export {startViewer, stopViewer, sendViewerMessage};