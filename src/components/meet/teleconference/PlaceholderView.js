import React from "react";
import { Row, Col, Card, Space, Layout } from "antd";

export default function PlaceholderView(props) {
  return (
    <>
      <Card
        title="No Appointment Selected"
        bordered={true}
        flex="auto"
        style={{ verticalAlign: "middle", textAlign: "center" }}
      >
        Select an upcoming appointment from the left panel.
      </Card>
    </>
  );
}
