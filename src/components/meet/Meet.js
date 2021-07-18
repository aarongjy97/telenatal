import React from "react";
import Teleconference from "./teleconference/Teleconference";
import { constants } from "./constants";
import { Layout, Row, Button, Col, Divider } from "antd";
import {
  MeetingProvider,
  darkTheme,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
export default function Meet(props) {
  const [teleconView, setTeleconView] = React.useState(
    constants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = React.useState(null);

  const onAppointmentTileClick = () => {
    // change the view on the child
    // get the appointment deets
    setAppointment(appointmentDummy);
    setTeleconView(constants.BEFORE_CALL_VIEW);
  };

  const appointmentDummy = {
    title: "Appointment With Blahblah Clinic",
    name: "Doctor Poopoo",
  };

  const onJoinCall = () => {
    setTeleconView(constants.MEETING_VIEW);
  };

  const onEndCall = () => {
    setTeleconView(constants.AFTER_CALL_VIEW);
  };

  // the one that pieces together all the components (appointment list, records input, teleconference)
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Row align="middle">
          <Col flex={2} offset={2}>
            <Button onClick={onAppointmentTileClick}>Click me heehee</Button>
          </Col>
          <Col flex={6} offset={2}>
            <ThemeProvider theme={darkTheme}>
              <MeetingProvider>
                <Teleconference
                  view={teleconView}
                  onJoinCall={onJoinCall}
                  onEndcall={onEndCall}
                  appointment={appointment}
                />
              </MeetingProvider>
            </ThemeProvider>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
