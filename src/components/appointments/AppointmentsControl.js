import React, { useState } from "react";
import {
  Space,
  Button,
  Form,
  Input,
  Modal,
  Cascader,
  Select,
  Radio,
} from "antd";
import {
  ReadOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { formatDate } from "./Appointments";
import { updateAppointment, deleteAppointment } from "../../api/Appointment";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function AppointmentsControl({ upcomingAppointments, user }) {
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] =
    useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  var upcomingAppointmentsOption = [];
  for (let i = 0; i < upcomingAppointments.length; i++) {
    upcomingAppointmentsOption[i] = {
      value: upcomingAppointments[i].appointmentId,
      label: formatDate(upcomingAppointments[i].date),
    };
  }

  var newAppointmentsOption = [
    {
      value: "2021-08-30",
      label: "2021-08-30",
      children: [
        {
          value: "1700",
          label: "5:00PM",
        },
        {
          value: "1730",
          label: "5:30PM",
        },
      ],
    },
    {
      value: "2021-07-29",
      label: "2021-07-29",
      children: [
        {
          value: "0800",
          label: "8:00AM",
        },
        {
          value: "1230",
          label: "12:30PM",
        },
      ],
    },
  ];

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
          <Button
            type="primary"
            form="bookAppointment"
            key="submit"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="bookAppointment"
          onFinish={onFinish}
        >
          {user === "DOCTOR" && (
            <Form.Item
              name="patient"
              label="Patient"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select your patient">
                <Option value="male">Patient1</Option>
                <Option value="female">Patient2</Option>
                <Option value="other">Patient3</Option>
              </Select>
            </Form.Item>
          )}

          {user === "PATIENT" && (
            <Form.Item
              name="professional"
              label="Professional"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select your medical professional">
                <Option value="male">Doctor1</Option>
                <Option value="female">Doctor2</Option>
                <Option value="other">Doctor3</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name={["dateTime"]}
            label="Date Time"
            rules={[{ required: true }]}
          >
            <Cascader
              options={newAppointmentsOption}
              expandTrigger="hover"
              placeholder="Select your appointment slot"
            />
          </Form.Item>

          <Form.Item
            name={["purpose"]}
            label="Purpose"
            rules={[
              {
                required: true,
                message: "Please input the visit purpose!",
              },
            ]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
                <Radio value={4}>
                  More...
                  <Input style={{ width: 100, marginLeft: 10 }} />
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name={["location"]}
            label="Location"
            rules={[
              {
                required: true,
                message: "Please input the appointment location!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["postalCode"]}
            label="Postal Code"
            rules={[
              {
                required: true,
                message: "Please input the appointment postal code!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["remarks"]}
            label="Remarks"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const rescheduleModal = () => {
    const onFinish = (values) => {
      const appointmentId = values.appointment;
      updateAppointment(appointmentId);
      setIsRescheduleModalVisible(false);
      // TODO: Refresh page
    };

    return (
      <Modal
        title="Reschedule Existing Appointment"
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
          <Button type="primary" form="rescheduleAppointment" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="rescheduleAppointment"
          onFinish={onFinish}
        >
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[
              {
                required: true,
                message: "Please select an appointment to reschedule!",
              },
            ]}
          >
            <Select
              placeholder="Select appointment to reschedule"
              options={upcomingAppointmentsOption}
            />
          </Form.Item>

          <Form.Item
            name={["dateTime"]}
            label="Date Time"
            rules={[{ required: true }]}
          >
            <Cascader
              options={newAppointmentsOption}
              expandTrigger="hover"
              placeholder="Select your appointment slot"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const cancelModal = () => {
    const onFinish = (values) => {
      const appointmentId = values.appointment;
      deleteAppointment(appointmentId);
      setIsCancelModalVisible(false);
      // TODO: Refresh page
    };

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
          <Button type="primary" form="cancelAppointment" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form {...formItemLayout} name="cancelAppointment" onFinish={onFinish}>
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[
              {
                required: true,
                message: "Please select an appointment to cancel!",
              },
            ]}
          >
            <Select
              placeholder="Select appointment to cancel"
              options={upcomingAppointmentsOption}
            />
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
