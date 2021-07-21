import React from "react";
import { Descriptions, Row, Col } from "antd";
import { formatDate } from "../../utils";

// maps fields to readable format
const patientFields = [
  ["name", "Name"],
  ["dob", "DOB"],
  ["drugAllergies", "Drug Allergies"],
  ["healthConditions", "Health Conditions"],
  ["dueDate", "Expected Due Date"],
  ["babyGender", "Baby Gender"],
  ["babyName", "Baby's Name"],
];

const appointmentFields = [
  ["date", "Appointment Date Time"],
  ["location", "Location"],
  ["purpose", "Visit Purpose"],
  ["remarks", "Visit Remarks"],
];

export default function AppointmentDetails(props) {
  const renderPatient = () => {
    return patientFields.map((item, i) => {
      return (
        <Descriptions.Item key={i} label={item[1]}>
          {props.patient[item[0]]}
        </Descriptions.Item>
      );
    });
  };

  const renderAppointment = () => {
    return appointmentFields.map((item, i) => {
      return (
        <Descriptions.Item key={i} label={item[1]}>
          {item[0] === "date" ? (
            <>{formatDate(props.appointment[item[0]])}</>
          ) : (
            <>{props.appointment[item[0]]}</>
          )}
        </Descriptions.Item>
      );
    });
  };
  return (
    <>
      <Row>
        <Col>
          <Descriptions
            title="Patient"
            layout="vertical"
            labelStyle={{ fontWeight: "bold" }}
          >
            {renderPatient()}
          </Descriptions>
        </Col>
        <Col>
          <Descriptions
            title="Appointment"
            layout="vertical"
            labelStyle={{ fontWeight: "bold" }}
          >
            {renderAppointment()}
          </Descriptions>
        </Col>
      </Row>
    </>
  );
}
