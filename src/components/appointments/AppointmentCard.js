import React from "react";
import { Card } from "antd";
import {
  ClockCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate } from "../utils";

export default function AppointmentCard({ appointment, user }) {
  return (
    <>
      {typeof appointment !== "undefined" && (
        <Card id="appointmentCard">
          <p>
            <span>{appointment.purpose}</span>
          </p>
          <p>
            <ClockCircleOutlined />
            &nbsp;{formatDate(appointment.date)}
          </p>
          {user === "DOCTOR" && (
            <p>
              <UserOutlined />
              &nbsp;{appointment.patientName}
            </p>
          )}
          {user === "PATIENT" && (
            <p>
              <UserOutlined />
              &nbsp;{appointment.professionalName}
            </p>
          )}
          <p>
            <PushpinOutlined />
            &nbsp;{appointment.location} S({appointment.postalCode})
          </p>
        </Card>
      )}
    </>
  );
}
