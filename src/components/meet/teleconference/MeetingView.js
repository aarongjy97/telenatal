import React from "react";
import {
  AudioInputControl,
  AudioOutputControl,
  ControlBar,
  ControlBarButton,
  Phone,
  VideoInputControl,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import { Row } from "antd";

export default function MeetingView(props) {
  return (
    <Row>
      <VideoTileGrid />
      <ControlBar layout="docked-horizontal" showLabels>
        <AudioInputControl />
        <VideoInputControl />
        <AudioOutputControl />
        <ControlBarButton
          icon={<Phone />}
          onClick={props.onEndCall}
          label="Leave Meeting"
        />
      </ControlBar>
    </Row>
  );
}
