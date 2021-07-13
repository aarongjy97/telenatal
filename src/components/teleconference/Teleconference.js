import React, { UseContext, useRef, VideoHTMLAttributes } from "react";

import VideoTile from "./VideoTile";
import VideoControls from "./VideoControls";
import ChatPanel from "./ChatPanel";
import { Row, Col, Button, Spin } from "antd";
import { startMaster, stopMaster, sendMasterMessage } from "./scripts/master";
import { startViewer, stopViewer, sendViewerMessage } from "./scripts/viewer";
import config from "./tempConfig";

export default function Teleconference(props) {
  // const user = UseContext(user)
  const [endCall, setEndCall] = React.useState(false);
  const [startCall, setStartCall] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [client, setClient] = React.useState({
    signalingClient: null,
    localStream: null,
    localView: null,
    remoteView: null,
    dataChannel: null,
    peerConnectionStatsInterval: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: [],
    receivedMessages: "",
  });

  client.localView = React.useRef(null);
  client.remoteView = React.useRef(null);

  // end the call and show end of call message
  const onEndCall = () => {
    setEndCall(true);
    setStartCall(false);
    if (config.role === "DOCTOR") {
      stopMaster(client);
    } else {
      stopViewer(client);
    }
  };

  // begin connection and set up video
  const onStartCall = () => {
    setStartCall(true);
    setEndCall(false);
    setLoading(true);
    renderVideo();
    setLoading(false);
  };

  // render the video
  const renderVideo = () => {
    // ASH TODO: props user role is just an assumption rn
    var clientUpdated;
    if (config.role === "DOCTOR") {
      clientUpdated = startMaster(client);
    } else {
      clientUpdated = startViewer(client);
    }
    setClient(clientUpdated);
  };

  const joinCall = (buttonMsg) => {
    return (
      <Button type="primary" shape="circle" onClick={onStartCall}>
        {buttonMsg}
      </Button>
    );
  };

  // --------- LAYOUTS ----------
  const callEnd = <Row>Call has ended</Row>;

  const callStart = (
    <>
      <div>Call started</div>
      <Row>
        <Col>
          <VideoTile
            endCall={endCall}
            loading={loading}
            localView={client.localView}
            remoteView={client.remoteView}
          />
          {/* <Spin spinning={loading}>
            <video
              id="local-view"
              ref={client.localView}
              autoPlay
              playsInline
            ></video>
            <video
              id="remote-view"
              ref={client.remoteView}
              autoPlay
              playsInline
            ></video>
          </Spin> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <VideoControls onEndCall={onEndCall} />
        </Col>
      </Row>
    </>
  );

  if (endCall) {
    return callEnd;
  } else if (startCall) {
    return callStart;
  } else {
    return joinCall("Start Call");
  }
}
