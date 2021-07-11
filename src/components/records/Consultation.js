import React from "react";
import {
  Collapse,
  Modal,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Select,
  Input,
} from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

const records = [
  {
    time: "6 Jul 2021, 6.30pm",
    diagnosis: "Healthy",
    medication: "NIL",
    description:
      "Just a regular checkup, all seems good so far. Recommend to exercise more and have a healthier diet.",
  },
  {
    time: "5 Jul 2021, 4.30pm",
    diagnosis: "Healthy",
    medication: "NIL",
    description:
      "Just a regular checkup, all seems good so far. Recommend to exercise more and have a healthier diet.",
  },
  {
    time: "20 Jun 2021, 8.00am",
    diagnosis: "Healthy",
    medication: "NIL",
    description:
      "Just a regular checkup, all seems good so far. Recommend to exercise more and have a healthier diet.",
  },
];
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function Consultation({ userType }) {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const createModal = () => {
    return (
      <Modal
        title="Create New Consultation Record"
        centered
        onCancel={() => setIsCreateModalVisible(false)}
        visible={isCreateModalVisible}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="consultation-create" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="consultation-create"
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
          <Form.Item
            name={["diagnosis"]}
            label="Diagnosis"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["medication"]}
            label="Medication"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
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
        <Form form={form} name="consultation-edit" onFinish={() => {}}>
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
            <Title level={5}>Add New Consultation</Title>
          </Button>
        </Row>
      )}

      <Collapse
        defaultActiveKey={["1"]}
        style={{ marginTop: userType === "DOCTOR" ? 0 : 20 }}
      >
        {records.map((record, index) => {
          return (
            <Panel header={record.time} key={index}>
              <Row style={{ paddingBottom: "20px" }}>
                <Col span={8}>
                  <Row>
                    <Title level={5}>Diagnosis</Title>
                  </Row>
                  <Row>
                    <Text>{record.diagnosis}</Text>
                  </Row>
                </Col>
                <Col flex="auto">
                  <Row>
                    <Title level={5}>Medication/Prescription</Title>
                  </Row>
                  <Row>
                    <Text>{record.medication}</Text>
                  </Row>
                </Col>

                {userType === "DOCTOR" && (
                  <Col justify="end">
                    <Row justify="end" style={{ paddingBottom: "20px" }}>
                      <Button
                        type="secondary"
                        icon={<EditOutlined />}
                        onClick={() => setIsEditModalVisible(true)}
                      >
                        <Text>Edit</Text>
                      </Button>
                    </Row>
                  </Col>
                )}
              </Row>
              <Row>
                <Title level={5}>Description</Title>
              </Row>
              <Row>
                <Text>{record.description}</Text>
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
