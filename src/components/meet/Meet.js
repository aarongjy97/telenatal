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
import { userContext } from "./../../userContext";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";

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
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  // TODO
  const patientId = "gengen@gengen.com"; // switch with context later
  const professionalId = "doctor1@aws.com"; // switch with context later
  const [teleconView, setTeleconView] = React.useState(
    teleConstants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = React.useState({});
  const [patient, setPatient] = React.useState({});
  const [showRecordsPanel, setShowRecordsPanel] = React.useState(false);
  const [patientList, setPatientList] = React.useState([]);
  const [professionalList, setProfessionalList] = React.useState([]);
  const [joinedCall, setJoinedCall] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      // NOTE: may also need to fetch patients for each appointment for the list view (for PROFESSIONAL) and professionals for each appointment (for PATIENT)
      if (userType === PROFESSIONAL) {
        setPatientList(patientList);
      } else {
        setProfessionalList(professionalList);
      }
    }, 2000);
  }, []);

  // Fetch upcoming appointment data
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  useEffect(() => {
    if (userType === PATIENT) {
      console.log("getting patient's appointments");
      getPatientUpcomingAppointments(patientId)
        .then((result) => {
          setUpcomingAppointments(result.data);
        })
        .catch((error) => console.log(error));
    } else if (userType === PROFESSIONAL) {
      console.log("getting professional's appointments");
      getProfessionalUpcomingAppointments(professionalId)
        .then((result) => {
          setUpcomingAppointments(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const onAppointmentTileClick = (appointment) => {
    if (!joinedCall) {
      // change the view on the child
      // get the appointment deets
      setAppointment(appointment);
      setTeleconView(teleConstants.BEFORE_CALL_VIEW);

      if (userType === PROFESSIONAL) {
        // assign the patient from the patientList
        // for now use dummy ;P
        console.log("user is doctor, setting selected patient");
        setPatient(patientDummy);
      }
    } else {
      // not allowed to get out of meeting before ending call
      message.warning(
        "End the current call before joining another appointment"
      );
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
                    onEndCall={onEndCall}
                    appointment={appointment}
                  />
                </MeetingProvider>
              </ThemeProvider>
            </Row>
            {/* <Row className="infoPanel">
              {showRecordsPanel && (
                <Col flex="auto">
                  <Records
                    onRecordsSubmit={onRecordsSubmit}
                    appointment={appointment}
                    patient={patient}
                  />
                </Col>
              )}
            </Row> */}
          </Col>
        </Row>
      </Layout>
    </>
  );
}
