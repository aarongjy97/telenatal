import React from "react";
import { Row, Col, Button } from "antd";

export default function VideoControls(props) {
  return (
    <Row>
      <Col>
        <Button type="primary" shape="circle" onClick={props.onEndCall}>
          End Call
        </Button>
      </Col>
    </Row>
  );
}
