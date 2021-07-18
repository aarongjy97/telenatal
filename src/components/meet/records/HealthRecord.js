import React from "react";
import {
  Row,
  Col,
  Layout,
  List,
  Typography,
  Collapse,
  Card,
  Statistic,
  Divider,
} from "antd";
import {
  HeartOutlined,
  DashboardOutlined,
  ColumnWidthOutlined,
  ForkOutlined,
} from "@ant-design/icons";
export default function HealthRecord(props) {
  const { Panel } = Collapse;
  const { Text } = Typography;

  return (
    <>
      <List
        style={{ overflow: "auto" }}
        itemLayout="vertical"
        dataSource={props.healthRecords}
        renderItem={(record) => (
          <List.Item>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header={record.time}>
                <Row style={{ paddingBottom: "20px" }} gutter={24}>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Card>
                          <Statistic
                            title="Weight"
                            value={record.weight}
                            precision={0}
                            prefix={<DashboardOutlined />}
                            valueStyle={{ color: "#b86f1b" }}
                            suffix="kg"
                          />
                        </Card>
                      </Layout>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Card>
                          <Statistic
                            title="Waist Measurement"
                            value={record.wm}
                            precision={0}
                            prefix={<ColumnWidthOutlined />}
                            valueStyle={{ color: "#1d8a25" }}
                            suffix="inches"
                          />
                        </Card>
                      </Layout>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Card>
                          <Statistic
                            title="Resting Heart Rate"
                            value={record.hr}
                            precision={0}
                            prefix={<HeartOutlined />}
                            valueStyle={{ color: "#1d8a25" }}
                            suffix="bpm"
                          />
                        </Card>
                      </Layout>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Card>
                          <Statistic
                            title="Blood Pressure"
                            value={record.bp}
                            precision={0}
                            prefix={<ForkOutlined />}
                            valueStyle={{ color: "#ad0e2d" }}
                            suffix="mm Hg"
                          />
                        </Card>
                      </Layout>
                    </Row>
                  </Col>
                </Row>
                <Divider orientation="left">Notes</Divider>
                <Row>
                  <Text>{record.notes}</Text>
                </Row>
              </Panel>
            </Collapse>
          </List.Item>
        )}
      ></List>
    </>
  );
}
