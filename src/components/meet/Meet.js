import React, { useState, useEffect, useContext } from "react";
import { Layout, Row, Col, message } from "antd";
import Teleconference from "./teleconference/Teleconference";
import {
  MeetingProvider,
  darkTheme,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
import Records from "./records/Records";
import AppointmentsList from "./appointments/AppointmentList";
import { teleConstants } from "./constants";
import {
  getPatientUpcomingAppointments,
  getProfessionalUpcomingAppointments,
} from "../../api/Appointment";
import { getPatient } from "../../api/User";
import { userContext } from "./../../userContext";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { sortAppointments } from "./../utils";

export default function Meet(props) {
  const { Sider } = Layout;

  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  // TODO
  const [teleconView, setTeleconView] = React.useState(
    teleConstants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = React.useState({});
  const [patient, setPatient] = React.useState({});
  const [showRecordsPanel, setShowRecordsPanel] = React.useState(false);
  const [joinedCall, setJoinedCall] = React.useState(false);

  // Fetch upcoming appointments data
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  useEffect(() => {
    if (userType === PATIENT) {
      console.log("getting patient's appointments");
      getPatientUpcomingAppointments(user.email)
        .then((result) => {
          setUpcomingAppointments(sortAppointments(result.data));
        })
        .catch((error) => console.log(error));
    } else if (userType === PROFESSIONAL) {
      console.log("getting professional's appointments");
      getProfessionalUpcomingAppointments(user.email)
        .then((result) => {
          setUpcomingAppointments(sortAppointments(result.data));
        })
        .catch((error) => console.log(error));
    }
  }, [user, userType]);

  const onAppointmentTileClick = (appointment) => {
    console.log(appointment);
    setAppointment(appointment);

    if (appointment.postalCode === 0) {
      // Video Conference
      if (!joinedCall) {
        // change the view on the child
        // get the appointment deets
        setTeleconView(teleConstants.BEFORE_CALL_VIEW);
      } else {
        // not allowed to get out of meeting before ending call
        message.warning(
          "End the current call before joining another appointment"
        );
      }
    } else {
      // Not video conference
      setTeleconView(teleConstants.MAPS);
    }

    if (userType === PROFESSIONAL) {
      // Assign patient from selected appointment
      console.log("user is doctor, setting selected patient");
      getPatient(appointment.patientId)
        .then((result) => {
          setPatient(result.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const onJoinCall = () => {
    setTeleconView(teleConstants.MEETING_VIEW);
    setJoinedCall(true);
    if (userType === PROFESSIONAL) {
      setShowRecordsPanel(true);
    }
  };

  const onEndCall = () => {
    setTeleconView(teleConstants.AFTER_CALL_VIEW);
    setJoinedCall(false);
  };

  const onRecordsSubmit = () => {
    console.log("records panel to false");
    setShowRecordsPanel(false);
  };

  // the one that pieces together all the components (appointment list, records input, teleconference)
  return (
    <>
      <Layout id="meet">
        <Sider className="appointmentList" width={400} collapsible={true} collapsedWidth={0}>
          <AppointmentsList
            upcomingAppointments={upcomingAppointments}
            user={user}
            onAppointmentTileClick={onAppointmentTileClick}
          />
        </Sider>
        <Row className="videoConference">
          <ThemeProvider theme={darkTheme}>
            <MeetingProvider>
              <Teleconference
                view={teleconView}
                onJoinCall={onJoinCall}
                onEndCall={onEndCall}
                appointment={appointment}
              />
            </MeetingProvider>
          </ThemeProvider>
        </Row>
        <Row className="infoPanel">
          {showRecordsPanel && (
            <Col flex="auto">
              <Records
                onRecordsSubmit={onRecordsSubmit}
                appointment={appointment}
                patient={patient}
              />
            </Col>
          )}
        </Row>
      </Layout>
    </>
  );
}
