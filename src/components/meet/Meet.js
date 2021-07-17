import React from "react";
import Teleconference from "./teleconference/Teleconference";
import { constants } from "./constants";
import { Row } from "antd";
export default function Meet(props) {
  const [meetingCache, setMeetingCache] = React.useState({});
  const [attendeeCache, setAttendeeCache] = React.useState({});
  const [teleconView, setTeleconView] = React.useState(
    constants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = React.useState(null);

  const onAppointmentTileClick = () => {
    // change the view on the child
  };

  const onJoinCall = () => {
    setTeleconView(constants.MEETING_VIEW);
  };

  const onEndCall = () => {};
  // the one that pieces together all the components (appointment list, records input, teleconference)
  return (
    <Row>
      <Teleconference
        view={teleconView}
        onJoinCall={onJoinCall}
        onEndcall={onEndCall}
        appointment={appointment}
      />
    </Row>
  );
}
