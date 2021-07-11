import React from "react";
import { Collapse, Row, Col, Typography, Image } from "antd";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const records = [
  {
    time: "6 Jul 2021, 6.30pm",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/CRL_Crown_rump_length_12_weeks_ecografia_Dr._Wolfgang_Moroder.jpg",
    notes: "Fetal growth normal, able to identify that baby has a huge head! ",
  },
  {
    time: "5 Jul 2021, 4.30pm",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/CRL_Crown_rump_length_12_weeks_ecografia_Dr._Wolfgang_Moroder.jpg",
    notes: "Fetal growth normal, able to identify that baby has a huge head! ",
  },
  {
    time: "20 Jun 2021, 8.00am",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/CRL_Crown_rump_length_12_weeks_ecografia_Dr._Wolfgang_Moroder.jpg",
    notes: "Fetal growth normal, able to identify that baby has a huge head! ",
  },
];

export default function Ultrasound() {
  return (
    <Collapse defaultActiveKey={["1"]}>
      {records.map((record, index) => {
        return (
          <Panel header={record.time} key={index}>
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Row>
                  <Title level={5}>Image</Title>
                </Row>
                <Row>
                  <Image width={200} height={200} src={record.image} />
                </Row>
              </Col>
              <Col>
                <Row>
                  <Title level={5}>Notes</Title>
                </Row>
                <Row>
                  <Text>{record.notes}</Text>
                </Row>
              </Col>
            </Row>
          </Panel>
        );
      })}
    </Collapse>
  );
}
