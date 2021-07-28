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

export default function MeetingView(props) {
  return (
    <div className="meetingView">
      <VideoTileGrid />
      <div className="meetControls">
        <ControlBar layout="docked-horizontal" showLabels>
          <AudioInputControl />
          <VideoInputControl />
          <AudioOutputControl />
          <ControlBarButton
            icon={<Phone />}
            onClick={props.onEndCall}
            label="Leave Meeting"
          />
          {/* <ContentShareControl /> */}
        </ControlBar>
      </div>
    </div>
  );
}
