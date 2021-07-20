import React, { useState } from "react";
import { Space, Button, Form, Input, Modal } from "antd";
import {
  ReadOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function AppointmentsControl({ user }) {
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] =
    useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const bookModal = () => {
    return (
      <Modal
        title="Book New Appointment"
        centered
        onCancel={() => setIsBookModalVisible(false)}
        visible={isBookModalVisible}
        footer={[
          <Button key="cancel" onClick={() => setIsBookModalVisible(false)}>
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
          {user === "DOCTOR" && (
            <Form.Item
              name="patient"
              label="Patient"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          )}
          {user === "PATIENT" && (
            <Form.Item
              name="professional"
              label="Professional"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          )}
          <Form.Item name={["date"]} label="Date" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={["time"]} label="Time" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["purpose"]}
            label="Visit Purpose"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["remarks"]}
            label="Visit Remarks"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const rescheduleModal = () => {
    return (
      <Modal
        title="Change Existing Appointment"
        centered
        onCancel={() => setIsRescheduleModalVisible(false)}
        visible={isRescheduleModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsRescheduleModalVisible(false)}
          >
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
            name={["purpose"]}
            label="Visit Purpose"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["remarks"]}
            label="Visit Remarks"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const cancelModal = () => {
    return (
      <Modal
        title="Cancel Existing Appointment"
        centered
        onCancel={() => setIsCancelModalVisible(false)}
        visible={isCancelModalVisible}
        footer={[
          <Button key="cancel" onClick={() => setIsCancelModalVisible(false)}>
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
            name={["remarks"]}
            label="Visit Remarks"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      <Space className="buttons" direction="vertical">
        <Button
          block
          type="primary"
          icon={<ReadOutlined />}
          onClick={() => setIsBookModalVisible(true)}
          style={{ background: "#c41d7f" }}
        >
          Book Appointment
        </Button>
        <Button
          block
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setIsRescheduleModalVisible(true)}
          style={{ background: "#f759ab" }}
        >
          Reschedule Appointment
        </Button>
        <Button
          block
          type="primary"
          icon={<CloseCircleOutlined />}
          onClick={() => setIsCancelModalVisible(true)}
          style={{ background: "#8c8c8c" }}
        >
          Cancel Appointment
        </Button>
      </Space>
      {bookModal()}
      {rescheduleModal()}
      {cancelModal()}
    </>
  );
}
