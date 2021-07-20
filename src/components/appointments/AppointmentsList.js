import React from "react";
import { Row, List, Card } from "antd";
import {
  ClockCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate } from "./Appointments";

export default function AppointmentsList({ upcomingAppointments, user }) {
  return (
    <>
      <Row className="title">Upcoming Appointments</Row>
      <Row className="content">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={upcomingAppointments}
          itemLayout="vertical"
          renderItem={(appointment) => (
            <List.Item>
              <Card className="card">
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
            </List.Item>
          )}
        />
      </Row>
    </>
  );
}
