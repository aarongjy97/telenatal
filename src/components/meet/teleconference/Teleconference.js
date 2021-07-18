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
import { joinCall, createMeeting, deleteMeeting } from "./scripts/connector";
export default function Teleconference(props) {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

  const onEndCall = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await meetingManager.leave();
      // call connector method to delete meeting from chime
      await deleteMeeting(meetingId);
    }

    // inform parent
    props.onEndCall();
  };

  const fetchMeetingDetails = () => {
    return props.appointment; // for now until we get a better understanding of what appointment is stored at
  };

  const onJoinCall = async () => {
    // call connector method to create joinInfo
    const meetingId = meetingManager.meetingId;
    var joinInfo = await joinCall(meetingId);

    // use meeting manager to join call
    await meetingManager.join({
      meetingInfo: joinInfo.Meeting,
      attendeeInfo: joinInfo.Attendee,
    });

    // localStorage.setItem(joinInfo.Meeting.MeetingId);

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
