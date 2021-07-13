import React from "react";

import { Spin } from "antd";

export default function VideoTile(props) {
  return (
    <Spin spinning={props.loading}>
      <video
        id="local-view"
        ref={props.localView}
        autoPlay
        playsInline
        muted
      ></video>
      <video
        id="remote-view"
        ref={props.remoteView}
        autoPlay
        playsInline
      ></video>
    </Spin>
  );
}
