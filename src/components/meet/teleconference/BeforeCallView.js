import React from "react";
import { Row, Col, Card, Button } from "antd";

export default function BeforeCallView(props) {

  const onJoinCall = () => {
    props.onJoinCall()
  }

  return (
    <Row>
      <Row>
        <Col>
          <Card title="Dummy meeting title">
            Blah blah blah meeting deets
            {/* Meeting name: {purpose}:{patientName}/{doctorName or clinicName}*/}
            {/* Meeting deets: Datetime, Remarks */}
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button type="primary" shape="circle" onClick={onJoinCall}>
            Join Call
          </Button>
        </Col>
      </Row>
    </Row>
  );
}
