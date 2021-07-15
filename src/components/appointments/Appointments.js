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
}]

// Sort appointments by decreasing date
appointments.sort(function(a, b) {
  var dateA = new Date(a.datetime);
  var dateB = new Date(b.datetime);
  return dateA < dateB ? 1 : -1;
});

const user = "DOCTOR"; // PATIENT or DOCTOR

export default function Appointments() {

    return (
      <Layout id="appointments">
        <Row style={{ height:"100%" }}>
          <Col span={16}>
            <AppointmentsCalendar 
              appointments={appointments} />
          </Col>
          <Col span={8}>
            <Row>
              <AppointmentsControl 
                user={user} />
            </Row>
            <Row>
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
