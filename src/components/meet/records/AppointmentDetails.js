import React from "react";
import { Row } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { formatDate, formatDateTime } from "../../utils";

export default function AppointmentDetails(props) {
  return (
    <div className="generalView">
      <Row>
        <h1>
          <CalendarOutlined />
          &nbsp;Appointment
        </h1>
      </Row>
      <Row>
        <ul>
          <li>
            <span>Date Time:</span> {formatDateTime(props.appointment["date"])}
          </li>
          <li>
            <span>Location:</span>{" "}
            {props.appointment["location"]}{" "}
            {props.appointment["postalCode"] !== 0 ? (
              <>S({props.appointment["postalCode"]})</>
            ) : null}
          </li>
          <li>
            <span>Purpose:</span> {props.appointment["purpose"]}
          </li>
          <li>
            <span>Remarks:</span>{" "}
            {props.appointment["remarks"] === undefined
              ? "NIL"
              : props.appointment["remarks"]}
          </li>
        </ul>
      </Row>
      <Row>
        <h1>
          <UserOutlined />
          &nbsp;Patient
        </h1>
      </Row>
      <Row>
        <ul>
          <li>
            <span>Name:</span> {props.patient["name"]}
          </li>
          <li>
            <span>Date of Birth:</span> {formatDate(props.patient["dob"])}
          </li>
          <li>
            <span>Drug Allergies:</span>{" "}
            {props.patient["allergies"] === undefined
              ? "NIL"
              : props.patient["allergies"].join(", ")}
          </li>
          <li>
            <span>Health Conditions:</span>{" "}
            {props.patient["healthConditions"] === undefined
              ? "NIL"
              : props.patient["healthConditions"].join(", ")}
          </li>
          <li>
            <span>Baby's Name: </span>
            {props.patient["babyName"] === undefined
              ? "Undetermined"
              : props.patient["babyName"]}
          </li>
          <li>
            <span>Baby Gender: </span>
            {props.patient["babyGender"] === undefined
              ? "Undetermined"
              : props.patient["babyGender"]}
          </li>
          <li>
            <span>Expected Due Date: </span>
            {props.patient["dueDate"] === undefined
              ? "Undetermined"
              : props.patient["dueDate"]}
          </li>
        </ul>
      </Row>
    </div>
  );
}
