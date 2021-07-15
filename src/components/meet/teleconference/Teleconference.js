import React from "react";
import MeetingView from "./MeetingView";
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  darkTheme
} from "amazon-chime-sdk-component-library-react";
// import {
//   joinCall,
//   getAttendeeInfo,
//   createMeeting,
//   deleteMeeting,
// } from "./scripts/connector";
import {constants} from "../constants"
import BeforeCallView from "./BeforeCallView";
import PlaceholderView from "./PlaceholderView";
import AfterCallView from "./AfterCallView";
export default function Teleconference(props) {
  // const user = UseContext(user)
  const fetchMeetingDetails = () => {
    // get based on props meeting id etc, make call to database to get
    // based on props.appointment

    return {}
  }

  const onEndCall = () => {
    props.onEndCall();
  }
  
  const onJoinCall = () => {
    // tell parent component to switch view
    props.onJoinCall();
  }

  // render
  console.log(props.view)
  switch (props.view) {
    case constants.MEETING_VIEW:
      return (
        <ThemeProvider theme={darkTheme}>
        <MeetingProvider>
          <MeetingView onEndCall={onEndCall} appointment={fetchMeetingDetails}/>
        </MeetingProvider>
        </ThemeProvider>
      );
    case constants.BEFORE_CALL_VIEW:
      return <BeforeCallView onJoinCall={onJoinCall} />;
    case constants.AFTER_CALL_VIEW:
      return <AfterCallView />;
    default:
      console.log("placeholder")
      return <PlaceholderView />;
  }
}
