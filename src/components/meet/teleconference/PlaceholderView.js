import React from "react";
import { Row, Col, Card } from "antd";

export default function PlaceholderView(props) {
  return (
    <Row>
      <Col>
        <Card title="No Appointment Selected" bordered={true}>
          Select an upcoming appointment from the left panel.
        </Card>
      </Col>
    </Row>
  );
}
