import React from "react";
import { Row, Col, Card, Button, Space } from "antd";
import { PreviewVideo } from "amazon-chime-sdk-component-library-react";

export default function BeforeCallView(props) {
  const onJoinCall = () => {
    props.onJoinCall();
  };

  return (
    <>
      <Space align="center" direction="vertical">
        <Card title={props.appointment.title}>
          {props.appointment.name}
          {/* Meeting name: {purpose}:{patientName}/{doctorName or clinicName}*/}
          {/* Meeting deets: Datetime, Remarks */}
        </Card>
        <PreviewVideo />

        <Button type="primary" onClick={onJoinCall}>
          Join Call
        </Button>
      </Space>
    </>
  );
}
