import React from "react";
import {
  Collapse, Modal, Button, Row, Col, Typography, Form,
  Input
} from 'antd';
import {useState} from 'react';

const {Panel} = Collapse;
const {Text, Title} = Typography;

const records = [
  {
    time: '6 Jul 2021, 6.30pm',
    diagnosis: 'Healthy',
    medication: 'NIL',
    description: 'Just a regular checkup, all seems good so far. Recommend to exercise more and have a healthier diet.'
  },
  {
    time: '5 Jul 2021, 4.30pm',
    diagnosis: 'Healthy',
    medication: 'NIL',
    description: 'Just a regular checkup, all seems good so far. Recommend to exercise more and have a healthier diet.'
  },
  {
    time: '20 Jun 2021, 8.00am',
    diagnosis: 'Healthy',
    medication: 'NIL',
    description: 'Just a regular checkup, all seems good so far. Recommend to exercise more and have a healthier diet.'
  }
];

export default function Consultation() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [description, setDescription] = useState('');
  const createModal = () => {
    return (
      <Modal
        title="Add New Consultation"
        centered
        visible={isCreateModalVisible}
        onOk={() => setIsCreateModalVisible(false)}
        okText="Submit"
        onCancel={() => setIsCreateModalVisible(false)}
      >
        <Form
          form={form}
          name="nest-messages"
          onFinish={() => {
          }}
        >
          <Form.Item
            name={["description"]}
            label="Description"
            rules={[{required: true}]}
          >
            <Input.TextArea value={description} onChange={setDescription}/>
          </Form.Item>
        </Form>
      </Modal>
    )
  };

  const editModal = () => {
    return (
      <Modal
        title="Edit Consultation"
        centered
        visible={isEditModalVisible}
        onOk={() => setIsEditModalVisible(false)}
        okText="Submit"
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form
          form={form}
          name="nest-messages"
          onFinish={() => {
          }}
        >
          <Form.Item
            name={["description"]}
            label="Description"
            rules={[{required: true}]}
          >
            <Input.TextArea value={description} onChange={setDescription}/>
          </Form.Item>
        </Form>
      </Modal>
    )
  };

  return (
    <>
      <Row justify="end" style={{paddingBottom: "20px"}}>
        <Button
          type="secondary"
          onClick={() => setIsCreateModalVisible(true)}
        >
          <Title level={5}>
            Add New Consultation
          </Title>
        </Button>
      </Row>
      <Collapse defaultActiveKey={['1']}>
        {records.map((record, index) => {
          return (
            <Panel header={record.time} key={index}>
              <Row style={{paddingBottom: "20px"}}>
                <Col span={8}>
                  <Row>
                    <Title level={5}>Diagnosis</Title>
                  </Row>
                  <Row>
                    <Text>{record.diagnosis}</Text>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Title level={5}>Medication/Prescription</Title>
                  </Row>
                  <Row>
                    <Text>{record.medication}</Text>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Title level={5}>Description</Title>
              </Row>
              <Row>
                <Text>{record.description}</Text>
              </Row>
              <Row justify="end" style={{paddingBottom: "20px"}}>
                <Button
                  type="secondary"
                  onClick={() => setIsEditModalVisible(true)}
                >
                  <Text>
                    Edit
                  </Text>
                </Button>
              </Row>
            </Panel>
          )
        })}
      </Collapse>
      {createModal()}
      {editModal()}
    </>
  )
}
