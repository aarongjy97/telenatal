import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import KinesisVideo from 'aws-sdk/clients/kinesisvideo';
import KinesisVideoSignalingChannels from 'aws-sdk/clients/kinesisvideosignalingchannels';
import config from "../tempConfig";
// start video for master
const startMaster = async (master) => {
  // const master = {
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
  const role = "MASTER";
  // create KVS client
  // ASH TODO: fetch config from db
  const kinesisVideoClient = new KinesisVideo({
    region: config.region,
    endpoint: config.endpoint || null,
    correctClockSkew: true,
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretAccessKey,
    sessionToken: config.sessionToken || null,
  });
  console.log("KVS client created");

  // get signaling channel ARN
  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: config.channelName,
    })
    .promise();
  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
  console.log("[MASTER] Channel ARN: ", channelARN);

  // Get signaling channel endpoints:
  const getSignalingChannelEndpointResponse = await kinesisVideoClient
    .getSignalingChannelEndpoint({
      ChannelARN: channelARN,
      SingleMasterChannelEndpointConfiguration: {
        Protocols: ["WSS", "HTTPS"],
        Role: role, //roleOption.MASTER
      },
    })
    .promise();
  console.log("received signalling channele endpoints");

  const endpointsByProtocol =
    getSignalingChannelEndpointResponse.ResourceEndpointList.reduce(
      (endpoints, endpoint) => {
        endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
        return endpoints;
      },
      {}
    );
  console.log("[MASTER] Endpoints: ", endpointsByProtocol);

  // create Signaling Client
  master.signalingClient = new SignalingClient({
    channelARN,
    channelEndpoint: endpointsByProtocol.WSS,
    role: role, //roleOption.MASTER
    region: config.region,
    systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    credentials: {
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretAccessKey,
      sessionToken: config.sessionToken || null,
    },
  });
  console.log("Created signaling client");

  // Get ICE server configuration
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
  console.log("created ICE server configuration...");

  const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
    .getIceServerConfig({
      ChannelARN: channelARN,
    })
    .promise();
  console.log("received ICE server config response");

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
      config.natTraversal === config.TURN_ONLY
        ? "relay"
        : "all",
  };

  const resolution =
    config.resolution === config.WIDESCREEN
      ? { width: { ideal: 1280 }, height: { ideal: 720 } }
      : { width: { ideal: 640 }, height: { ideal: 480 } };

  const constraints = {
    video: config.sendVideo ? resolution : false,
    audio: config.sendAudio,
  };

  // Get a stream from the webcam and display it in the local view.
  // If no video/audio needed, no need to request for the sources.
  // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
  if (config.sendVideo || config.sendAudio) {
    try {
      console.log("Getting user media stream...");
      master.localStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      master.localView.current.srcObject = master.localStream;
      //localView.current.srcObject = appStore.master.localStream;
    } catch (e) {
      console.log("Error: ", e);
      console.error("[MASTER] Could not find webcam");
    }
  }

  console.log("Adding signalingClient.on open handler...");
  master.signalingClient.on("open", async () => {
    console.log("[MASTER] Connected to signaling service");
  });

  console.log("Adding signalingClient.on sdpOffer handler...");

  master.signalingClient.on("sdpOffer", async (offer, remoteClientId) => {
    console.log("[MASTER] Received SDP offer from client: " + remoteClientId);

    // Create a new peer connection using the offer from the given client
    const peerConnection = new RTCPeerConnection(configuration);

    master.peerConnectionByClientId[remoteClientId] = peerConnection;

    if (master.openDataChannel) {
      console.log(`Opened data channel with ${remoteClientId}`);
      master.dataChannelByClientId[remoteClientId] =
        peerConnection.createDataChannel("kvsDataChannel");
      peerConnection.ondatachannel = (event) => {
        event.channel.onmessage = (message) => {
          const timestamp = new Date().toISOString();
          const loggedMessage = `${timestamp} - from ${remoteClientId}: ${message.data}\n`;
          console.log(loggedMessage);
          master.receivedMessages += loggedMessage;
        };
      };
    }

    // Poll for connection stats
    if (!master.peerConnectionStatsInterval) {
      master.peerConnectionStatsInterval = setInterval(
        () => peerConnection.getStats().then(stats => console.log(stats)),
        1000
      );
    }

    // Send any ICE candidates to the other peer
    peerConnection.addEventListener("icecandidate", ({ candidate }) => {
      if (candidate) {
        console.log(
          "[MASTER] Generated ICE candidate for client: " + remoteClientId
        );

        // When trickle ICE is enabled, send the ICE candidates as they are generated.
        if (config.useTrickleICE) {
          console.log(
            "[MASTER] Sending ICE candidate to client: " + remoteClientId
          );
          master.signalingClient.sendIceCandidate(candidate, remoteClientId);
        }
      } else {
        console.log(
          "[MASTER] All ICE candidates have been generated for client: " +
            remoteClientId
        );

        // When trickle ICE is disabled, send the answer now that all the ICE candidates have ben generated.
        if (!config.useTrickleICE) {
          console.log(
            "[MASTER] Sending SDP answer to client: " + remoteClientId
          );
          master.signalingClient.sendSdpAnswer(
            peerConnection.localDescription,
            remoteClientId
          );
        }
      }
    });

    // As remote tracks are received, add them to the remote view
    console.log('Adding peerConnection listener for "track"...');

    peerConnection.addEventListener("track", (event) => {
      console.log(
        "[MASTER] Received remote track from client: " + remoteClientId
      );
      if (master.remoteView.current.srcObject) {
        return;
      }

      master.remoteView.current.srcObject = event.streams[0];
    });

    // If there's no video/audio, master.localStream will be null. So, we should skip adding the tracks from it.
    if (master.localStream) {
      console.log("There's no audio/video...");
      master.localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, master.localStream));
    }
    await peerConnection.setRemoteDescription(offer);

    // Create an SDP answer to send back to the client
    console.log("[MASTER] Creating SDP answer for client: " + remoteClientId);
    await peerConnection.setLocalDescription(
      await peerConnection.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
    );

    // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
    if (config.useTrickleICE) {
      console.log("[MASTER] Sending SDP answer to client: " + remoteClientId);
      config.signalingClient.sendSdpAnswer(
        peerConnection.localDescription,
        remoteClientId
      );
    }
    console.log(
      "[MASTER] Generating ICE candidates for client: " + remoteClientId
    );
  });

  master.signalingClient.on(
    "iceCandidate",
    async (candidate, remoteClientId) => {
      console.log(
        "[MASTER] Received ICE candidate from client: " + remoteClientId
      );

      // Add the ICE candidate received from the client to the peer connection
      const peerConnection = master.peerConnectionByClientId[remoteClientId];
      peerConnection.addIceCandidate(candidate);
    }
  );

  master.signalingClient.on("close", () => {
    console.log("[MASTER] Disconnected from signaling channel");
  });

  master.signalingClient.on("error", () => {
    console.error("[MASTER] Signaling client error");
  });

  console.log("[MASTER] Starting master connection");
  master.signalingClient.open();

  return master;
};

const stopMaster = (master) => {
  console.log("[MASTER] Stopping master connection");
  if (master.signalingClient) {
    master.signalingClient.close();
    master.signalingClient = null;
  }

  Object.keys(master.peerConnectionByClientId).forEach((clientId) => {
    master.peerConnectionByClientId[clientId].close();
  });
  master.peerConnectionByClientId = [];

  if (master.localStream) {
    master.localStream.getTracks().forEach((track) => track.stop());
    master.localStream = null;
  }

  master.remoteStreams.forEach((remoteStream) =>
    remoteStream.getTracks().forEach((track) => track.stop())
  );
  master.remoteStreams = [];

  if (master.peerConnectionStatsInterval) {
    clearInterval(master.peerConnectionStatsInterval);
    master.peerConnectionStatsInterval = null;
  }

  if (master.localView) {
    master.localView.srcObject = null;
  }

  if (master.remoteView) {
    master.remoteView.srcObject = null;
  }

  if (master.dataChannelByClientId) {
    master.dataChannelByClientId = {};
  }

  return master;
}

const sendMasterMessage = (master, message) => {
  Object.keys(master.dataChannelByClientId).forEach((clientId) => {
    try {
      master.dataChannelByClientId[clientId].send(message);
    } catch (e) {
      console.error("[MASTER] Send DataChannel: ", e.toString());
    }
  });
}

export {startMaster, stopMaster, sendMasterMessage};