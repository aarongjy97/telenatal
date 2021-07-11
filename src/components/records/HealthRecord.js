import React from "react";
import {Collapse, Row, Col, Typography} from 'antd';

const {Panel} = Collapse;
const {Text, Title} = Typography;
const records = [
  {
    time: '6 Jul 2021, 6.30pm',
    weight: '58 kg',
    wm: '42 inches',
    hr: '72 bpm',
    bp: '120/88 mm Hg',
    notes: 'Feeling more fatigue in the past few days'
  },
  {
    time: '5 Jul 2021, 4.30pm',
    weight: '58 kg',
    wm: '42 inches',
    hr: '72 bpm',
    bp: '120/88 mm Hg',
    notes: 'Feeling more fatigue in the past few days'
  },
  {
    time: '20 Jun 2021, 8.00am',
    weight: '58 kg',
    wm: '42 inches',
    hr: '72 bpm',
    bp: '120/88 mm Hg',
    notes: 'Feeling more fatigue in the past few days'
  },
];

export default function HealthRecord() {
  return (
    <Collapse defaultActiveKey={['1']}>
      {records.map((record, index) => {
        return (
          <Panel header={record.time} key={index}>
            <Row style={{paddingBottom: "20px"}}>
              <Col span={8}>
                <Row>
                  <Title level={5}>Weight</Title>
                </Row>
                <Row>
                  <Text>{record.weight}</Text>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Title level={5}>Waist Measurement</Title>
                </Row>
                <Row>
                  <Text>{record.wm}</Text>
                </Row>
              </Col>
            </Row>

            <Row style={{paddingBottom: "20px"}}>
              <Col span={8}>
                <Row>
                  <Title level={5}>Resting Heartrate</Title>
                </Row>
                <Row>
                  <Text>{record.hr}</Text>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Title level={5}>Blood Pressure</Title>
                </Row>
                <Row>
                  <Text>{record.bp}</Text>
                </Row>
              </Col>
            </Row>

            <Row>
              <Title level={5}>Notes</Title>
            </Row>
            <Row>
              <Text>{record.notes}</Text>
            </Row>
          </Panel>
        )
      })}
    </Collapse>
  )
}
