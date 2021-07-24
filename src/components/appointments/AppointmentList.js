import React from "react";
import { Layout, Row, List } from "antd";
import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ upcomingAppointments, userType }) {
  return (
    <Layout id="appointmentList">
      <Row className="title">Upcoming Appointments</Row>
      <Row className="content">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={upcomingAppointments}
          itemLayout="vertical"
          renderItem={(appointment) => (
            <List.Item>
              <AppointmentCard appointment={appointment} userType={userType} />
            </List.Item>
          )}
        />
      </Row>
    </Layout>
  );
}
