import React from "react";
import {
  // VideoTileGrid,
  LocalVideo,
  RemoteVideo,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { Row, Col } from "antd";

export default function MeetingView(props) {
  const meetingManager = useMeetingManager();

  React.useEffect(() => {
    // start call once in meeting view
    // const data = props.meetingData; // dummy
    // const joinData = {
    //   meetingInfo: data.Meeting,
    //   attendeeInfo: data.Attendee,
    // };
    // // Use the join API to create a meeting session
    // meetingManager.join(joinData).then(() => {
    //   // At this point you can let users setup their devices, or start the session immediately
    //   meetingManager.start();
    // })
  });

  return (
    <Row>
      <Col>
        <LocalVideo />
        <RemoteVideo />
      </Col>
    </Row>
  );
}
