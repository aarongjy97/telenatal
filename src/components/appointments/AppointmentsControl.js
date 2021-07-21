import React, { useState, useEffect } from "react";
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
import { formatDate } from "../utils";
import {
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctors,
  getNurses,
} from "../../api/Appointment";
import AppointmentCard from "./AppointmentCard";

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
  const [selectedPurpose, setSelectedPurpose] = useState();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  // Load options for appointment selection
  var upcomingAppointmentsOption = [];
  for (let i = 0; i < upcomingAppointments.length; i++) {
    upcomingAppointmentsOption[i] = {
      value: upcomingAppointments[i].appointmentId,
      label: formatDate(upcomingAppointments[i].date),
    };
  }

  // Render change for appointment selection
  const [selectedAppointment, setSelectedAppointment] = useState();
  var upcomingAppointmentsChange = (appointmentId) => {
    getAppointment(appointmentId)
      .then((result) => {
        setSelectedAppointment(result.data);
      })
      .catch((error) => console.log(error));
  };

  // Fetch all doctors
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getDoctors()
      .then((result) => {
        setDoctors(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Fetch all nurses
  const [nurses, setNurses] = useState([]);
  useEffect(() => {
    getNurses()
      .then((result) => {
        setNurses(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // TODO: Fetch all patients
  const [patients, setPatients] = useState([]);

  // Load options for medical professionals
  var doctorOption = { value: "doctor", label: "Doctor", options: [] };
  for (let i = 0; i < doctors.length; i++) {
    doctorOption.options[i] = {
      value: doctors[i]["email"],
      label: doctors[i]["name"],
    };
  }
  var nurseOption = { value: "nurse", label: "Nurse", options: [] };
  for (let i = 0; i < nurses.length; i++) {
    nurseOption.options[i] = {
      value: nurses[i]["email"],
      label: nurses[i]["name"],
    };
  }
  var professionalOption = [doctorOption, nurseOption];

  // TODO: Load options for patients
  var patientOption = [];

  // TODO: Fetch available appointments

  // TODO: Load options for available appointments
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
        getContainer={false}
        onCancel={() => {
          setIsBookModalVisible(false);
          setSelectedPurpose();
          form.resetFields();
        }}
        visible={isBookModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsBookModalVisible(false);
              setSelectedPurpose();
              form.resetFields();
            }}
          >
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
              rules={[
                {
                  required: true,
                  message: "Please select a patient!",
                },
              ]}
            >
              <Select
                placeholder="Select your patient"
                options={patientOption}
              />
            </Form.Item>
          )}

          {user === "PATIENT" && (
            <Form.Item
              name="professional"
              label="Professional"
              rules={[
                {
                  required: true,
                  message: "Please select a medical professional!",
                },
              ]}
            >
              <Select
                placeholder="Select your medical professional"
                options={professionalOption}
              />
            </Form.Item>
          )}

          <Form.Item
            name={["dateTime"]}
            label="Date Time"
            rules={[
              {
                required: true,
                message: "Please select an appointment slot!",
              },
            ]}
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
                message: "Please select the visit purpose!",
              },
            ]}
          >
            <Radio.Group
              onChange={(values) => setSelectedPurpose(values.target.value)}
            >
              <Space direction="vertical">
                <Radio name={"Check up"} value={"Check up"}>
                  Check up
                </Radio>
                <Radio name={"Ultrasound"} value={"Ultrasound"}>
                  Ultrasound
                </Radio>
                <Radio name={"Vaccination"} value={"Vaccination"}>
                  Vaccination
                </Radio>
                <Radio name={"Others"} value={"Others"}>
                  Others
                  {selectedPurpose === "Others" ? (
                    <Input style={{ width: 100, marginLeft: 10 }} />
                  ) : null}
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
      window.location.replace("/appointments");
    };

    return (
      <Modal
        title="Reschedule Existing Appointment"
        centered
        getContainer={false}
        onCancel={() => {
          setIsRescheduleModalVisible(false);
          setSelectedAppointment();
          form.resetFields();
        }}
        visible={isRescheduleModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsRescheduleModalVisible(false);
              setSelectedAppointment();
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            form="rescheduleAppointment"
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
              onChange={upcomingAppointmentsChange}
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

          <AppointmentCard appointment={selectedAppointment} user={user} />
        </Form>
      </Modal>
    );
  };

  const cancelModal = () => {
    const onFinish = (values) => {
      const appointmentId = values.appointment;
      deleteAppointment(appointmentId);
      setIsCancelModalVisible(false);
      window.location.replace("/appointments");
    };

    return (
      <Modal
        title="Cancel Existing Appointment"
        centered
        getContainer={false}
        onCancel={() => {
          setIsCancelModalVisible(false);
          setSelectedAppointment();
          form.resetFields();
        }}
        visible={isCancelModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsCancelModalVisible(false);
              setSelectedAppointment();
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            form="cancelAppointment"
            key="submit"
            htmlType="submit"
          >
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
              onChange={upcomingAppointmentsChange}
              options={upcomingAppointmentsOption}
            />
          </Form.Item>
        </Form>
        <AppointmentCard appointment={selectedAppointment} user={user} />
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
