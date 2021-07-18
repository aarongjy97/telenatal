import React from "react";
import { Row, List, Card } from "antd";
import {
  ClockCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function AppointmentsList({ appointments, user }) {
  return (
    <>
      <Row className="title">Upcoming Appointments</Row>
      <Row className="content">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={appointments}
          itemLayout="vertical"
          renderItem={(appointment) => (
            <List.Item>
              <Card className="card">
                <p>
                  <span>{appointment.purpose}</span>
                </p>
                <p>
                  <ClockCircleOutlined />
                  &nbsp;{appointment.datetime}
                </p>
                {user === "DOCTOR" && (
                  <p>
                    <UserOutlined />
                    &nbsp;Name of Patient {appointment.patientId}
                  </p>
                )}
                {user === "PATIENT" && (
                  <p>
                    <UserOutlined />
                    &nbsp;Name of Doctor {appointment.professionalId}
                  </p>
                )}
                <p>
                  <PushpinOutlined />
                  &nbsp;{appointment.location}
                </p>
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
}
