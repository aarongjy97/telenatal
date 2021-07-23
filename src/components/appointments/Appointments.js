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
} from "../../api/Appointment";
import { userContext } from "./../../userContext";

export default function Appointments() {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = "medicalLicenseNo" in user ? "professional" : "patient";
  const loggedIn = Object.keys(user).length === 0 ? false : true;

  // Fetch appointment data
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (userType === "patient") {
      getPatientAppointments(user.email)
        .then((result) => {
          setAppointments(result.data);
        })
        .catch((error) => console.log(error));
    } else if (userType === "professional") {
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
    if (userType === "patient") {
      getPatientUpcomingAppointments(user.email)
        .then((result) => {
          setUpcomingAppointments(result.data);
        })
        .catch((error) => console.log(error));
    } else if (userType === "professional") {
      getProfessionalUpcomingAppointments(user.email)
        .then((result) => {
          setUpcomingAppointments(result.data);
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
              <AppointmentControl
                upcomingAppointments={upcomingAppointments}
                userType={userType}
              />
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
