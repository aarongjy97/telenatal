import React from "react";
import {
  Divider,
  Tooltip,
  Collapse,
  Row,
  Col,
  Card,
  Layout,
  Statistic,
  Typography,
} from "antd";
import {
  HeartOutlined,
  DashboardOutlined,
  ColumnWidthOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Text } = Typography;
const records = [
  {
    time: "6 Jul 2021, 6.30pm",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "5 Jul 2021, 4.30pm",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "20 Jun 2021, 8.00am",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
];

export default function HealthRecord() {
  return (
    <Collapse defaultActiveKey={["1"]}>
      {records.map((record, index) => {
        return (
          <Panel header={record.time} key={index}>
            <Divider orientation="left">Health Readings</Divider>
            <Row style={{ paddingBottom: "20px" }} gutter={24}>
              <Col span={6}>
                <Row>
                  <Layout className="layout" style={{ minHeight: "10vh" }}>
                    <Tooltip
                      title="Your weight is entering the abnormal range. Please consult your doctor during your subsequent appointment."
                      color="#b86f1b"
                      key="bp"
                    >
                      <Card>
                        <Statistic
                          title="Weight"
                          value={record.weight}
                          precision={0}
                          prefix={<DownloadOutlined />}
                          valueStyle={{ color: "#b86f1b" }}
                          suffix="kg"
                        />
                      </Card>
                    </Tooltip>
                  </Layout>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Layout className="layout" style={{ minHeight: "10vh" }}>
                    <Tooltip
                      title="Your waist measurement is in the normal range!"
                      color="#1d8a25"
                      key="bp"
                    >
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
                    </Tooltip>
                  </Layout>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Layout className="layout" style={{ minHeight: "10vh" }}>
                    <Tooltip
                      title="Your heart rate is in the normal range!"
                      color="#1d8a25"
                      key="bp"
                    >
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
                    </Tooltip>
                  </Layout>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Layout className="layout" style={{ minHeight: "10vh" }}>
                    <Tooltip
                      title="Your blood pressure is in the abnormal range. Please consult your doctor during your subsequent appointment."
                      color="#ad0e2d"
                      key="bp"
                    >
                      <Card>
                        <Statistic
                          title="Blood Pressure"
                          value={record.bp}
                          precision={0}
                          prefix={<DashboardOutlined />}
                          valueStyle={{ color: "#ad0e2d" }}
                          suffix="mm Hg"
                        />
                      </Card>
                    </Tooltip>
                  </Layout>
                </Row>
              </Col>
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
