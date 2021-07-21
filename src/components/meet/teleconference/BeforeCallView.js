import React from "react";
import { Card, Button, Space } from "antd";
import { PreviewVideo } from "amazon-chime-sdk-component-library-react";

export default function BeforeCallView(props) {
  const onJoinCall = () => {
    props.onJoinCall();
  };

  return (
    <>
      <Space align="center" direction="vertical">
        <Card title={props.appointment.purpose}>
          {props.appointment.date}
        </Card>
        <PreviewVideo />
        <Button type="primary" onClick={onJoinCall}>
          Join Call
        </Button>
      </Space>
    </>
  );
}
