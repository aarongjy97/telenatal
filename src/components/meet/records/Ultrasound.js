import React from "react";
import { Collapse, Row, Col, Typography, Image } from "antd";
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const { Panel } = Collapse;
const { Text, Title } = Typography;
export default function Ultrasound(props) {
  return (
    <Collapse defaultActiveKey={["1"]} style={{ marginTop: 20 }}>
      {props.ultrasounds.map((record, index) => {
        return (
          <Panel header={record.time} key={index}>
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={6} style={{ paddingLeft: 20 }}>
                <Row>
                  <Title level={5}>Image</Title>
                </Row>
                <Row>
                  <Image width={200} height={200} src={record.image} />
                </Row>
              </Col>
              <Col span={6} flex="auto" style={{ paddingLeft: 10 }}>
                <Row>
                  <Title level={5}>Notes</Title>
                </Row>
                <Row>
                  <Text>{record.notes}</Text>
                </Row>
              </Col>

              <Col span={6} style={{ paddingLeft: 20 }}>
                <Row>
                  <Title level={5}>Image</Title>
                </Row>
                <Row>
                  <Image width={200} height={200} src={record.image} />
                </Row>
              </Col>
              <Col span={6} style={{ paddingLeft: 10 }}>
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
