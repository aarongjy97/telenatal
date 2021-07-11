import React from "react";
import { Collapse, Row, Typography } from "antd";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const records = [
  {
    time: "6 Jul 2021, 6.30pm",
    testName: "Urine Test",
    notes: "Results are positive and normal",
  },
  {
    time: "6 Jul 2021, 6.30pm",
    testName: "Urine Test",
    notes: "Results are positive and normal",
  },
  {
    time: "6 Jul 2021, 6.30pm",
    testName: "Urine Test",
    notes: "Results are positive and normal",
  },
];

export default function MedicalTest() {
  return (
    <Collapse defaultActiveKey={["1"]}>
      {records.map((record, index) => {
        return (
          <Panel header={record.time} key={index}>
            <Row>
              <Title level={5}>Test</Title>
            </Row>
            <Row style={{ paddingBottom: 20 }}>
              <Text>{record.testName}</Text>
            </Row>
            <Row>
              <Title level={5}>Notes</Title>
            </Row>
            <Row>
              <Text>{record.notes}</Text>
            </Row>
          </Panel>
        );
      })}
    </Collapse>
  );
}
