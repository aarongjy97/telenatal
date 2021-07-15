import React from "react";
import { Row, Col, Button } from "antd";
import {ControlBar} from 'amazon-chime-sdk-component-library-react'

export default function MeetingControls(props) {
  return (
    <Row>
      <Col>
        <ControlBar/>
      </Col>
    </Row>
  );
}
