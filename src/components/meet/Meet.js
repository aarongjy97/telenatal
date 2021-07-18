import React from "react";
import Teleconference from "./teleconference/Teleconference";
import Records from "./records/Records";
import { constants } from "./constants";
import { Layout, Row, Button, Col, Divider } from "antd";
import {
  MeetingProvider,
  darkTheme,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";

const appointmentDummy = {
  appointmentId: "A0002",
  datetime: "9 Jul 2021 10:45:00 AM",
  location: "Home",
  purpose: "Checkup",
  remarks: "Not feeling well",
  patientId: "PA0001",
  professionalId: "PR0001",
  consultationRecordId: null,
  healthRecordId: null,
  ultrasoundId: null,
  testRecordId: null,
};

const patientDummy = {
  patientId: "PA0001",
  name: "Lee Ji Eun",
  email: "jieunlee@naver.co.kr",
  phone: "98765432",
  profileImage: "avatar.jpg",
  dob: "1995-12-09",
  address: "Coex Artium, Gangnam-gu, Seoul",
  postalCode: "57132",
  drugAllergies: null,
  healthConditions: null,
  dueDate: "2021-12-03",
  babyName: "Eve",
  babyGender: "Undetermined",
  professionalId: "PR0001",
};
export default function Meet(props) {
  const user = "DOCTOR"; // switch with context later
  const [teleconView, setTeleconView] = React.useState(
    constants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = React.useState({});
  const [appointmentList, setAppointmentList] = React.useState([]);
  const [patient, setPatient] = React.useState({});
  const [showRecordsPanel, setShowRecordsPanel] = React.useState(false);

  // load all appointments
  React.useEffect(() => {
    // make call to fetch user's appointments
    // for now just use dummy
    // NOTE: may also need to fetch patients for appointment for the list view
  }, []);

  const onAppointmentTileClick = () => {
    // change the view on the child
    // get the appointment deets
    setAppointment(appointmentDummy);
    setTeleconView(constants.BEFORE_CALL_VIEW);

    if (user === "DOCTOR") {
      // make a call to fetch patient details from the patientId in appointment object
      // for now use dummy ;P
      console.log("setting selected patient");
      setPatient(patientDummy);
    }
  };

  const onJoinCall = () => {
    setTeleconView(constants.MEETING_VIEW);
    if (user === "DOCTOR") {
      setShowRecordsPanel(true);
    }
  };

  const onEndCall = () => {
    setTeleconView(constants.AFTER_CALL_VIEW);
  };

  const onRecordsSubmit = () => {
    console.log("records panel to false");
    setShowRecordsPanel(false);
  };

  // the one that pieces together all the components (appointment list, records input, teleconference)
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Row align="middle">
          <Col flex={2} offset={2}>
            <Button onClick={onAppointmentTileClick}>
              Click to load dummy patient and appointment
            </Button>
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
        {/* {showRecordsPanel && (
          <Row>
            <Col flex="auto">
              <Records
              onRecordsSubmit={onRecordsSubmit}
              appointment={appointment}
            />
            </Col>
          </Row>
        ) */}
        <Row>
          <Col flex="auto">
            <Records
              onRecordsSubmit={onRecordsSubmit}
              appointment={appointment}
              patient={patient}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
