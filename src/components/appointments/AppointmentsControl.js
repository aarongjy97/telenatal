import React, { useState } from "react";
import { Layout, Space, Button, Form, Input, Modal } from "antd";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};


export default function AppointmentsControl({ user }) {
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] = useState(false);
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
          {user === "DOCTOR" && 
            <Form.Item
              name="patient"
              label="Patient"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          }
          {user === "PATIENT" && 
            <Form.Item
              name="professional"
              label="Professional"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          }
          <Form.Item
            name={["date"]}
            label="Date"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["time"]}
            label="Time"
            rules={[{ required: true }]}
          >
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
          <Button key="cancel" onClick={() => setIsRescheduleModalVisible(false)}>
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
    <Layout>
      <Space
        className="buttons"
        direction="vertical"
        >
        <Button 
          block 
          onClick={() => setIsBookModalVisible(true)}
          >
          Book Appointment
        </Button>
        <Button 
          block
          onClick={() => setIsRescheduleModalVisible(true)}
          >
          Reschedule Appointment
        </Button>
        <Button 
          block 
          onClick={() => setIsCancelModalVisible(true)}
          >
          Cancel Appointment
        </Button>
      </Space>
    </Layout>
    { bookModal() }
    { rescheduleModal() }
    { cancelModal() }
    </>
  );
};