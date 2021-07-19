import React from "react";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";

const { Panel } = Collapse;
const { Text, Title } = Typography;

export default function MedicalTest(props) {
  return (
    <Collapse defaultActiveKey={["1"]} style={{ marginTop: 20 }}>
      {props.medicalTests.map((record, index) => {
        return (
          <Panel header={record.time} key={index}>
            <Row>
              <Col flex="auto">
                <Divider orientation="left">Test</Divider>
              </Col>
            </Row>
            <Row style={{ paddingBottom: 20 }}>
              <Text>{record.testName}</Text>
            </Row>
            <Divider orientation="left">Notes</Divider>
            <Row>
              <Text>{record.notes}</Text>
            </Row>
          </Panel>
        );
      })}
    </Collapse>
  );
}
