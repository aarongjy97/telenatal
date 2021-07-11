import React, { useState } from "react";
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
import { EditOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

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
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function MedicalTest({ userType }) {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const createModal = () => {
    return (
      <Modal
        title="Create New Test Results Record"
        centered
        onCancel={() => setIsCreateModalVisible(false)}
        visible={isCreateModalVisible}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="test-create" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="test-create"
          onFinish={onFinish}
        >
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an appointment to save this record under.">
              {records.map((record, _) => {
                return <Option value={record.time}>{record.time}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name={["test"]} label="Test" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["notes"]}
            label="Notes"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const editModal = () => {
    return (
      <Modal
        title="Edit Test Results"
        centered
        visible={isEditModalVisible}
        onOk={() => setIsEditModalVisible(false)}
        okText="Submit"
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} name="test-edit" onFinish={() => {}}>
          <Form.Item
            name={["description"]}
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      {userType === "DOCTOR" && (
        <Row justify="end" style={{ paddingBottom: "20px" }}>
          <Button
            type="secondary"
            onClick={() => setIsCreateModalVisible(true)}
          >
            <Title level={5}>Add New Test Results</Title>
          </Button>
        </Row>
      )}

      <Collapse defaultActiveKey={["1"]} style={{marginTop: userType === "DOCTOR" ? 0 : 20}}>
        {records.map((record, index) => {
          return (
            <Panel header={record.time} key={index}>
              <Row>
                <Col flex="auto">
                  <Divider orientation="left">Test</Divider>
                </Col>
                <Col justify="end" style={{ paddingLeft: "15px" }}>
                  <Button
                    type="secondary"
                    onClick={() => setIsEditModalVisible(true)}
                    icon={<EditOutlined />}
                  >
                    <Text>Edit</Text>
                  </Button>
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
      {userType === "DOCTOR" && createModal()}
      {userType === "DOCTOR" && editModal()}
    </>
  );
}
