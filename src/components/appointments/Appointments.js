import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import Fade from "react-reveal";
import AppointmentList from "./AppointmentList";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentControl from "./AppointmentControl";
import {
  getPatientAppointments,
  getPatientUpcomingAppointments,
  getProfessionalAppointments,
  getProfessionalUpcomingAppointments,
} from "./../../api/Appointment";
import { sortAppointments, isDictEmpty } from "./../utils";
import { userContext } from "./../../userContext";
import { PATIENT, PROFESSIONAL } from "../../constants/constants";

export default function Appointments() {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;
  const loggedIn = isDictEmpty(user) ? false : true;

  // Fetch appointment data
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (userType === PATIENT) {
      getPatientAppointments(user.email)
        .then((result) => {
          setAppointments(result.data);
        })
        .catch((error) => console.log(error));
    } else if (userType === PROFESSIONAL) {
      getProfessionalAppointments(user.email)
        .then((result) => {
          setAppointments(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user, userType]);

  // Fetch upcoming appointment data
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  useEffect(() => {
    if (userType === PATIENT) {
      getPatientUpcomingAppointments(user.email)
        .then((result) => {
          setUpcomingAppointments(sortAppointments(result.data));
        })
        .catch((error) => console.log(error));
    } else if (userType === PROFESSIONAL) {
      getProfessionalUpcomingAppointments(user.email)
        .then((result) => {
          setUpcomingAppointments(sortAppointments(result.data));
        })
        .catch((error) => console.log(error));
    }
  }, [user, userType]);

  if (!loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout id="appointments">
        <Row style={{ height: "100%" }}>
          <Col className="left" span={16}>
            <Fade left>
              <div className="calendar">
                <AppointmentCalendar appointments={appointments} />
              </div>
            </Fade>
          </Col>
          <Col className="right" span={8}>
            <Row className="control">
              <AppointmentControl upcomingAppointments={upcomingAppointments} />
            </Row>
            <Fade right>
              <Row className="list">
                <AppointmentList
                  upcomingAppointments={upcomingAppointments}
                  userType={userType}
                />
              </Row>
            </Fade>
          </Col>
        </Row>
      </Layout>
    );
  }
}
