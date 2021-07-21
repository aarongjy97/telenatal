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

export function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function sameMonth(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
}

export function formatAMPM(date) {
  var date = new Date(date);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ampm;
  return strTime;
}

export function formatDate(date) {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var date = date.getDate();
  var strTime = formatAMPM(date);
  var strDate = year + "-" + month + "-" + date + " " + strTime;
  return strDate;
}

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
