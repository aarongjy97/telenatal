import React from "react";
import { Layout, Row, Col } from "antd";
import AppointmentsList from "./AppointmentsList";
import AppointmentsCalendar from "./AppointmentsCalendar";
import AppointmentsControl from "./AppointmentsControl";

var appointments = [{
  "appointmentId": "A0001",
  "datetime": "27 Aug 2021 08:45:00 AM",
  "location": "Changi General Hospital Consultation Room 45",
  "purpose": "Checkup",
  "remarks": "Not feeling well",
  "patientId": "PA0001",
  "professionalId": "PR0001",
  "consultationRecordId": null,
  "healthRecordId": null,
  "ultrasoundId": null,
  "testRecordId": null
},
{
  "appointmentId": "A0002",
  "datetime": "9 Jul 2021 10:45:00 AM",
  "location": "Home",
  "purpose": "Checkup",
  "remarks": "Not feeling well",
  "patientId": "PA0001",
  "professionalId": "PR0001",
  "consultationRecordId": null,
  "healthRecordId": null,
  "ultrasoundId": null,
  "testRecordId": null
},
{
  "appointmentId": "A0003",
  "datetime": "13 Dec 2020 10:45:00 AM",
  "location": "Changi General Hospital Consultation Room 45",
  "purpose": "Checkup",
  "remarks": "Not feeling well",
  "patientId": "PA0001",
  "professionalId": "PR0001",
  "consultationRecordId": null,
  "healthRecordId": null,
  "ultrasoundId": null,
  "testRecordId": null
}, {
  "appointmentId": "A0011",
  "datetime": "27 Aug 2021 12:30:00 AM",
  "location": "Changi General Hospital Consultation Room 45",
  "purpose": "Consultation",
  "remarks": "Not feeling well",
  "patientId": "PA0001",
  "professionalId": "PR0001",
  "consultationRecordId": null,
  "healthRecordId": null,
  "ultrasoundId": null,
  "testRecordId": null
},]

// Sort appointments by decreasing date
appointments.sort(function(a, b) {
  var dateA = new Date(a.datetime);
  var dateB = new Date(b.datetime);
  return dateA < dateB ? 1 : -1;
});

const user = "DOCTOR"; // PATIENT or DOCTOR

export function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export function sameMonth(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth();
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}

export default function Appointments() {

    return (
      <Layout id="appointments">
        <Row style={{ height:"100%" }}>
          <Col className="left" span={16}>
            <div className="calendar">
              <AppointmentsCalendar 
                appointments={appointments} />
            </div>
          </Col>
          <Col className="right" span={8}>
            <Row className="control">
              <AppointmentsControl 
                user={user} />
            </Row>
            <Row className="list">
              <AppointmentsList
                appointments={appointments} 
                user={user}
                />
            </Row>
          </Col>
        </Row>
      </Layout>
    );
  }
