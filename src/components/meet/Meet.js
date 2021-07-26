import React, { useState, useEffect, useContext } from "react";
import {
  MeetingProvider,
  darkTheme,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
import { Layout, message } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  PushpinOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Teleconference from "./teleconference/Teleconference";
import Records from "./records/Records";
import AppointmentsList from "./appointments/AppointmentList";
import Maps from "./maps/Maps";
import { teleConstants } from "./constants";
import {
  getPatientUpcomingAppointments,
  getProfessionalUpcomingAppointments,
} from "../../api/Appointment";
import { getPatient } from "../../api/User";
import { userContext } from "./../../userContext";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { sortAppointments, formatDateTime, isDictEmpty } from "./../utils";
import PlaceholderView from "./PlaceholderView";

export default function Meet(props) {
  const { Content, Sider } = Layout;

  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  const [teleconView, setTeleconView] = useState(
    teleConstants.PLACEHOLDER_VIEW
  );
  const [appointment, setAppointment] = useState({});
  const [patient, setPatient] = useState({});
  const [joinedCall, setJoinedCall] = useState(false);

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

    // no physical location for appointment, set to teleconference
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
  };

  const onEndCall = () => {
    setTeleconView(teleConstants.AFTER_CALL_VIEW);
    setJoinedCall(false);
  };

  const onRecordsSubmit = () => {};

  // the one that pieces together all the components (appointment list, records input, teleconference)
  return (
    <Layout id="meet">
      <Sider
        className="appointmentList"
        width={400}
        collapsible={true}
        collapsedWidth={0}
      >
        <AppointmentsList
          upcomingAppointments={upcomingAppointments}
          user={user}
          onAppointmentTileClick={onAppointmentTileClick}
        />
      </Sider>
      <Content className="meetContent">
        <h1>{appointment.purpose}</h1>
        {userType === PROFESSIONAL && (
          <li>
            <UserOutlined /> {appointment.patientName}
          </li>
        )}
        {userType === PATIENT && (
          <li>
            <UserOutlined /> {appointment.professionalName}
          </li>
        )}
        <li>
          <CalendarOutlined /> {formatDateTime(appointment.date)}
        </li>
        <li>
          <PushpinOutlined /> {appointment.location}{" "}
          {appointment.postalCode !== 0 ? (
            <>S({appointment.postalCode})</>
          ) : null}
        </li>
        {appointment.remarks !== undefined && (
          <li>
            <EllipsisOutlined />
            {appointment.remarks}
          </li>
        )}
        <div className="meetCore">
          {appointment && appointment.postalCode === 0 && (
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
          )}
          {appointment && appointment.postalCode !== 0 && <Maps />}
          {!appointment && <PlaceholderView />}
        </div>
      </Content>
      {!isDictEmpty(appointment) && (
        <Sider
          className="infoPanel"
          width={400}
          collapsible={true}
          collapsedWidth={0}
          reverseArrow={true}
        >
          <Records
            onRecordsSubmit={onRecordsSubmit}
            appointment={appointment}
            patient={patient}
          />
        </Sider>
      )}
    </Layout>
  );
}
