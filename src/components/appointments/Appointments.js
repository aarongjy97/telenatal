import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import AppointmentsList from "./AppointmentsList";
import AppointmentsCalendar from "./AppointmentsCalendar";
import AppointmentsControl from "./AppointmentsControl";
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

  // Sort appointments by decreasing date
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
            <AppointmentsCalendar appointments={appointments} />
          </div>
        </Col>
        <Col className="right" span={8}>
          <Row className="control">
            <AppointmentsControl
              upcomingAppointments={upcomingAppointments}
              user={user}
            />
          </Row>
          <Row className="list">
            <AppointmentsList
              upcomingAppointments={upcomingAppointments}
              user={user}
            />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
