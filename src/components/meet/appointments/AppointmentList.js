import React, { useState } from "react";
import { Layout, Row, List, Spin } from "antd";
import AppointmentCard from "./AppointmentCard";
import { isDictEmpty } from "./../../utils";

export default function AppointmentsList({
  upcomingAppointments,
  onAppointmentTileClick,
}) {
  const [showList, setShowList] = useState(false);

  setTimeout(function () {
    setShowList(true);
  }, 2000);

  return (
    <Layout id="appointmentListMeet">
      <Row className="title">Upcoming Appointments</Row>
      <Row className="spin">
        {!showList && <Spin />}
        {showList && isDictEmpty(upcomingAppointments) && (
          <p>Please book an appointment via the 'Appointments' Tab!</p>
        )}
      </Row>
      <Row className="content">
        {showList && !isDictEmpty(upcomingAppointments) && (
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
        )}
      </Row>
    </Layout>
  );
}
