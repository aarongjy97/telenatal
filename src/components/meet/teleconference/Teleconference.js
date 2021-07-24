import React from "react";
import MeetingView from "./MeetingView";
import {
  useMeetingManager,
  MeetingStatus,
  useMeetingStatus,
} from "amazon-chime-sdk-component-library-react";
import { teleConstants } from "../constants";
import BeforeCallView from "./BeforeCallView";
import PlaceholderView from "./PlaceholderView";
import AfterCallView from "./AfterCallView";
import { joinCall, deleteMeeting } from "../../../api/Teleconference";
export default function Teleconference(props) {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

  const onEndCall = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await meetingManager.leave();
      console.log("Leaving meeting...");

      // not sure if should be deleting this meeting straightaway, probably to be done with backend maintenance
      // await deleteMeeting("80f775eb-d2b8-40f0-9bab-8f18d4270706");
    }
    // inform parent
    props.onEndCall();
  };

  const onJoinCall = async () => {
    // call connector method to create joinInfo
    const meetingId = "1a1eaba8-5202-4f8f-923c-2c4debf10706";
    // take the meetingId from the appointment object
    console.log(meetingId);
    var joinInfo = await joinCall(meetingId);

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
      return <PlaceholderView />;
  }
}
