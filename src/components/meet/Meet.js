import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import Teleconference from "./teleconference/Teleconference";
import {
  MeetingProvider,
  darkTheme,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
import Records from "./records/Records";
import AppointmentsList from "./appointments/AppointmentList";
import { constants } from "./constants";
import {
  getPatientUpcomingAppointments,
  getProfessionalUpcomingAppointments,
} from "../../api/Appointment";

const patientList = [];
const professionalList = [];

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
  const patientId = "gengen@gengen.com"; // switch with context later
  const professionalId = "doctor1@aws.com"; // switch with context later
  const [teleconView, setTeleconView] = React.useState(
    constants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = React.useState({});
  const [patient, setPatient] = React.useState({});
  const [showRecordsPanel, setShowRecordsPanel] = React.useState(false);
  const [patientList, setPatientList] = React.useState([]);
  const [professionalList, setProfessionalList] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      // NOTE: may also need to fetch patients for each appointment for the list view (for DOCTOR) and professionals for each appointment (for PATIENT)
      if (user === "DOCTOR") {
        setPatientList(patientList);
      } else {
        setProfessionalList(professionalList);
      }
    }, 2000);
  }, []);

  // Fetch upcoming appointment data
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  useEffect(() => {
    if (user === "PATIENT") {
      getPatientUpcomingAppointments(patientId)
        .then((result) => {
          setUpcomingAppointments(result.data);
        })
        .catch((error) => console.log(error));
    } else if (user === "DOCTOR") {
      getProfessionalUpcomingAppointments(professionalId)
        .then((result) => {
          setUpcomingAppointments(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const onAppointmentTileClick = (appointment) => {
    // change the view on the child
    // get the appointment deets
    setAppointment(appointment);
    setTeleconView(constants.BEFORE_CALL_VIEW);

    if (user === "DOCTOR") {
      // assign the patient from the patientList
      // for now use dummy ;P
      console.log("user is doctor, setting selected patient");
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
      <Layout id="meet">
        <Row style={{ height: "100%" }}>
          <Col className="appointmentList" span={6}>
            <AppointmentsList
              upcomingAppointments={upcomingAppointments}
              user={user}
              onAppointmentTileClick={onAppointmentTileClick}
            />
          </Col>
          <Col className="appointmentDetails" span={14}>
            <Row className="videoConference">
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
            </Row>
            <Row className="infoPanel">
              <Col flex="auto">
                {/* <Button onClick={onAppointmentTileClick}>
                  Click to load dummy patient and appointment
                </Button> */}
                <Records
                  onRecordsSubmit={onRecordsSubmit}
                  appointment={appointment}
                  patient={patient}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* {showRecordsPanel && (
          <Row>
            <Col flex="auto">
              <Records
              onRecordsSubmit={onRecordsSubmit}
              appointment={appointment}
              patient={patient}
            />
            </Col>
          </Row>
        ) */}
      </Layout>
    </>
  );
}
