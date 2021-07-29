import React from "react";
import MeetingView from "./MeetingView";
import {
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { teleConstants } from "../constants";
import BeforeCallView from "./BeforeCallView";
import AfterCallView from "./AfterCallView";
import { joinCall } from "../../../api/Teleconference";
export default function Teleconference(props) {
  const meetingManager = useMeetingManager();

  const onEndCall = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await meetingManager.leave();
      console.log("Leaving meeting...");
    }
    // inform parent
    props.onEndCall();
  };

  const onJoinCall = async () => {
    // call connector method to create joinInfo
    // take the meetingId from the appointment object
    console.log("starting meeting...");
    var joinInfo = await joinCall(props.appointment);

    // use meeting manager to join call
    await meetingManager.join({
      meetingInfo: joinInfo.Meeting,
      attendeeInfo: joinInfo.Attendee,
    });

    await meetingManager.start();
    // tell parent component that user chose to join call
    props.onJoinCall();
  };

  // render
  switch (props.view) {
    case teleConstants.MEETING_VIEW:
      return (
        <MeetingView onEndCall={onEndCall} appointment={props.appointment} />
      );
    case teleConstants.BEFORE_CALL_VIEW:
      return (
        <BeforeCallView
          onJoinCall={onJoinCall}
          appointment={props.appointment}
        />
      );
    case teleConstants.AFTER_CALL_VIEW:
      return <AfterCallView />;
    default:
      return;
  }
}
