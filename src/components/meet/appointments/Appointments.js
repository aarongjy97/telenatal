import React from "react";
import { List, Card } from "antd";
import {
  ClockCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";

const user = "DOCTOR";
export default function Appointments(props) {
  const onAppointmentTileClick = (index) => {
    console.log(index);
    props.onAppointmentTileClick(index);
  };
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={props.appointments}
      itemLayout="vertical"
      renderItem={(appointment, index) => (
        <List.Item key={index}>
          <div onClick={() => onAppointmentTileClick(index)}>
            <Card hoverable>
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
          </div>
        </List.Item>
      )}
    />
  );
}
