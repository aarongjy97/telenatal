import React from "react";
import MeetingView from "./MeetingView";
import {
  useMeetingManager,
  MeetingStatus,
  useMeetingStatus,
} from "amazon-chime-sdk-component-library-react";
import { constants } from "../constants";
import BeforeCallView from "./BeforeCallView";
import PlaceholderView from "./PlaceholderView";
import AfterCallView from "./AfterCallView";
import {
  joinCall,
  createMeeting,
  deleteMeeting,
} from "../../../api/Teleconference";
export default function Teleconference(props) {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

  const onEndCall = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await meetingManager.leave();
      // call connector method to delete meeting from chime
      await deleteMeeting("80f775eb-d2b8-40f0-9bab-8f18d4270706");
    }

    // inform parent
    props.onEndCall();
  };

  const onJoinCall = async () => {
    // call connector method to create joinInfo
    var joinInfo = await joinCall("80f775eb-d2b8-40f0-9bab-8f18d4270706");

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
    case constants.MEETING_VIEW:
      return (
        <MeetingView onEndCall={onEndCall} appointment={props.appointment} />
      );
    case constants.BEFORE_CALL_VIEW:
      return (
        <BeforeCallView
          onJoinCall={onJoinCall}
          appointment={props.appointment}
        />
      );
    case constants.AFTER_CALL_VIEW:
      return <AfterCallView />;
    default:
      return <PlaceholderView />;
  }
}
