import React, { useState } from "react";
import { Layout, Row, List, Spin } from "antd";
import AppointmentCard from "./AppointmentCard";
import { isDictEmpty } from "./../utils";

export default function AppointmentList({ upcomingAppointments }) {
  const [showList, setShowList] = useState(false);

  setTimeout(function () {
    setShowList(true);
  }, 1000);

  return (
    <Layout id="appointmentList">
      <Row className="title">Upcoming Appointments</Row>
      <Row className="spin">
        {!showList && <Spin />}
        {showList && isDictEmpty(upcomingAppointments) && (
          <p>Please book an appointment!</p>
        )}
      </Row>
      <Row className="content">
        {showList && !isDictEmpty(upcomingAppointments) && (
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={upcomingAppointments}
            itemLayout="vertical"
            renderItem={(appointment) => {
              return (
                <List.Item key="appointment.appointmentId">
                  <AppointmentCard appointment={appointment} />
                </List.Item>
              );
            }}
          />
        )}
      </Row>
    </Layout>
  );
}
