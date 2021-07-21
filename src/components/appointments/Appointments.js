import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import AppointmentList from "./AppointmentList";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentControl from "./AppointmentControl";
import {
  getPatientAppointments,
  getPatientUpcomingAppointments,
  getProfessionalAppointments,
  getProfessionalUpcomingAppointments,
} from "../../api/Appointment";

const patientId = "gengen@gengen.com";
const professionalId = "hayoonchul@gmail.com";
const user = "PATIENT"; // PATIENT or DOCTOR

export default function Appointments() {
  // Fetch appointment data
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (user === "PATIENT") {
      getPatientAppointments(patientId)
        .then((result) => {
          setAppointments(result.data);
        })
        .catch((error) => console.log(error));
    } else if (user === "DOCTOR") {
      getProfessionalAppointments(professionalId)
        .then((result) => {
          setAppointments(result.data);
        })
        .catch((error) => console.log(error));
    }
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

  // Sort appointments by decreasing date //TODO: Fix this
  upcomingAppointments.sort(function (a, b) {
    var dateA = new Date(a.datetime);
    var dateB = new Date(b.datetime);
    return dateA < dateB ? 1 : -1;
  });

  return (
    <Layout id="appointments">
      <Row style={{ height: "100%" }}>
        <Col className="left" span={16}>
          <div className="calendar">
            <AppointmentCalendar appointments={appointments} />
          </div>
        </Col>
        <Col className="right" span={8}>
          <Row className="control">
            <AppointmentControl
              upcomingAppointments={upcomingAppointments}
              user={user}
            />
          </Row>
          <Row className="list">
            <AppointmentList
              upcomingAppointments={upcomingAppointments}
              user={user}
            />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
