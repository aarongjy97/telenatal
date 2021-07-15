import React from "react";
import { Layout, Row, List, Card } from "antd";
import InfiniteScroll from 'react-infinite-scroller';

export default function AppointmentsList({ appointments, user }) {
  return (
    <Layout>
      <Row>
        Upcoming appointments
      </Row>
      <Row>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={appointments}
          itemLayout="vertical"
          renderItem={appointment => (
            <List.Item>
              <Card>
                <p>{appointment.datetime}</p>
                <p>{appointment.purpose}</p>
                <p>{appointment.location}</p>
                {user === "DOCTOR" && (
                  <p>Name of Patient {appointment.patientId}</p>
                )}
                {user === "PATIENT" && (
                  <p>Name of Doctor {appointment.professionalId}</p>
                )}
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </Layout>
  );
};
