import React from "react";
import { Layout, Row, List } from "antd";
import AppointmentCard from "./AppointmentCard";

export default function AppointmentsList({
  upcomingAppointments,
  onAppointmentTileClick,
}) {
  return (
    <Layout id="appointmentList">
      <Row className="title">Upcoming Appointments</Row>
      <Row className="content">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={upcomingAppointments}
          itemLayout="vertical"
          renderItem={(appointment) => (
            <List.Item
              key={appointment.appointmentId}
              onClick={() => onAppointmentTileClick(appointment)}
            >
              <AppointmentCard appointment={appointment} />
            </List.Item>
          )}
        />
      </Row>
    </Layout>
  );
}
