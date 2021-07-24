import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import {
  Space,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Radio,
  DatePicker,
} from "antd";
import {
  ReadOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Fade from "react-reveal";
import {
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctors,
  getNurses,
  getProfessionalAvailability,
  createAppointment,
} from "./../../api/Appointment";
import { getPatient, getProfessional } from "./../../api/User";
import AppointmentCard from "./AppointmentCard";
import { formatDate, formatTime } from "./../utils";
import { userContext } from "./../../userContext";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function AppointmentControl({ upcomingAppointments }) {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = "medicalLicenseNo" in user ? "professional" : "patient";

  const [form] = Form.useForm();
  const { Option } = Select;

  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] =
    useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedPurpose, setSelectedPurpose] = useState();
  const [newAppointmentsOption, setNewAppointmentsOption] = useState([]);

  function clearSelection() {
    setSelectedProfessional();
    setSelectedAppointment();
    setSelectedDate();
    setSelectedPurpose();
  }

  const onBook = (values) => {
    let date = new Date(values.time).valueOf();
    let location = "";
    let postalCode = "";
    let patientId = "";
    let professionalId = "";

    // Set Professional and Patient Entity
    if (userType === "patient") {
      patientId = user.email;
      professionalId = values.professionalId;
    } else if (userType === "professional") {
      patientId = values.patientId;
      professionalId = user.email;
    }

    // Get Appointment Location
    if (values.location === "video") {
      location = "Video Conference";
      postalCode = 0;
    } else if (values.location === "patient") {
      if (userType === "patient") {
        // Load patient details
        location = user.address;
        postalCode = user.postalCode;
      } else if (userType === "professional") {
        // Fetch patient details
        let patient = getPatient(values.patientId);
        location = patient.address;
        postalCode = patient.postalCode;
      }
    } else if (values.location === "professional") {
      if (userType === "patient") {
        // Fetch professional details
        let professional = getProfessional(values.professionalId);
        location = professional.clinicName + ", " + professional.clinicAddress;
        postalCode = professional.clinicPostalCode;
      } else if (userType === "professional") {
        // Load professional detail
        location = user.clinicName + ", " + user.clinicAddress;
        postalCode = user.clinicPostalCode;
      }
    }

    createAppointment(
      values.purpose,
      date,
      location,
      postalCode,
      patientId,
      professionalId,
      values.remarks
    )
      .then((result) => {
        clearSelection();
        setIsBookModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const onReschedule = (values) => {
    console.log("reschedule: ", values);
  };

  const onCancel = (values) => {
    console.log("cancel: ", values);
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
  var upcomingAppointmentsChange = (appointmentId) => {
    getAppointment(appointmentId)
      .then((result) => {
        setSelectedAppointment(result.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userType === "patient") {
      // Fetch all doctors
      getDoctors()
        .then((result) => {
          setDoctors(result.data);
        })
        .catch((error) => console.log(error));

      // Fetch all nurses
      getNurses()
        .then((result) => {
          setNurses(result.data);
        })
        .catch((error) => console.log(error));
    } else if (userType === "professional") {
      // TODO: Fetch all patients
      getNurses()
        .then((result) => {
          setPatients(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [userType]);

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
  const professionalOption = [doctorOption, nurseOption];

  // Load options for patients
  var patientOption = [];
  for (let i = 0; i < patients.length; i++) {
    patientOption[i] = {
      value: patients[i]["email"],
      label: patients[i]["name"],
    };
  }

  // Load available appointments
  // TODO: load for medical professional view also
  function updateNewAppointmentsOption(appointmentSlots) {
    var newAppointmentsOption = [];
    for (let i = 0; i < appointmentSlots.length; i++) {
      var appointmentTime = moment(appointmentSlots[i]);
      if (appointmentTime.isAfter()) {
        newAppointmentsOption.push({
          value: appointmentSlots[i],
          label: formatTime(appointmentSlots[i]),
        });
      }
    }
    setNewAppointmentsOption(newAppointmentsOption);
  }

  // Conditionally fetch available appointments
  function getAppointmentSlots(professionalId, date) {
    if (professionalId) {
      setSelectedProfessional(professionalId);
      if (selectedDate != null) {
        getProfessionalAvailability(professionalId, selectedDate).then(
          (result) => {
            updateNewAppointmentsOption(result.data);
          }
        );
      }
    }
    if (date) {
      setSelectedDate(date);
      if (selectedProfessional != null) {
        getProfessionalAvailability(selectedProfessional, date).then(
          (result) => {
            updateNewAppointmentsOption(result.data);
          }
        );
      }
    }
  }

  const bookModal = () => {
    return (
      <Modal
        title="Book New Appointment"
        centered
        getContainer={false}
        onCancel={() => {
          setIsBookModalVisible(false);
          setSelectedPurpose();
          setSelectedProfessional();
          setSelectedDate();
          setNewAppointmentsOption();
          form.resetFields();
        }}
        visible={isBookModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsBookModalVisible(false);
              setSelectedPurpose();
              setSelectedProfessional();
              setSelectedDate();
              setNewAppointmentsOption();
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
          onFinish={onBook}
        >
          {userType === "professional" && (
            <Form.Item
              name="patientId"
              label="Patient"
              rules={[
                {
                  required: userType === "professional",
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

          {userType === "patient" && (
            <Form.Item
              name="professionalId"
              label="Professional"
              rules={[
                {
                  required: userType === "patient",
                  message: "Please select a medical professional!",
                },
              ]}
            >
              <Select
                placeholder="Select medical professional"
                options={professionalOption}
                onChange={(professionalId) => {
                  getAppointmentSlots(professionalId, null);
                }}
              />
            </Form.Item>
          )}

          <Form.Item
            name={["date"]}
            label="Date"
            rules={[
              {
                required: true,
                message: "Please select an appointment date!",
              },
            ]}
          >
            <DatePicker
              format={"ddd, D MMM YYYY"}
              allowClear={false}
              disabledDate={(current) => {
                return current < moment().startOf("day");
              }}
              onChange={(date) => {
                getAppointmentSlots(
                  null,
                  date !== null ? date.format("YYYY-MM-DD") : null
                );
              }}
            />
          </Form.Item>

          <Form.Item
            name={["time"]}
            label="Time"
            rules={[
              {
                required: true,
                message: "Please select an appointment time!",
              },
            ]}
          >
            <Select placeholder="Select time" options={newAppointmentsOption} />
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
                    <Input style={{ width: "5em", marginLeft: 10 }} />
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
            <Select placeholder="Select location">
              <Option value="video">Video Conference</Option>
              <Option value="patient">Patient's Residence</Option>
              <Option value="professional">Professional's Clinic</Option>
            </Select>
          </Form.Item>

          <Form.Item name={["remarks"]} label="Remarks">
            <Input.TextArea />
          </Form.Item>

          <AppointmentCard />
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
          setNewAppointmentsOption();
          form.resetFields();
        }}
        visible={isRescheduleModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsRescheduleModalVisible(false);
              setSelectedAppointment();
              setNewAppointmentsOption();
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
            name={["date"]}
            label="New Date"
            rules={[
              {
                required: true,
                message: "Please select an appointment date!",
              },
            ]}
          >
            <DatePicker
              format={"ddd, D MMM YYYY"}
              allowClear={false}
              disabledDate={(current) => {
                return current < moment().startOf("day");
              }}
              onChange={(date) => {
                getAppointmentSlots(
                  null,
                  date !== null ? date.format("YYYY-MM-DD") : null
                );
              }}
            />
          </Form.Item>

          <Form.Item
            name={["time"]}
            label="New Time"
            rules={[
              {
                required: true,
                message: "Please select an appointment time!",
              },
            ]}
          >
            <Select placeholder="Select time" options={newAppointmentsOption} />
          </Form.Item>

          <AppointmentCard
            appointment={selectedAppointment}
            userType={userType}
          />
        </Form>
      </Modal>
    );
  };

  const cancelModal = () => {
    const onFinish = (values) => {
      const appointmentId = values.appointment;
      const meetingId = selectedAppointment.meetingId;
      deleteAppointment(appointmentId, meetingId);
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
        <AppointmentCard
          appointment={selectedAppointment}
          userType={userType}
        />
      </Modal>
    );
  };

  return (
    <>
      <Space className="buttons" direction="vertical">
        <Fade right>
          <Button
            block
            type="primary"
            icon={<ReadOutlined />}
            onClick={() => setIsBookModalVisible(true)}
            style={{ background: "#c41d7f" }}
          >
            Book Appointment
          </Button>
        </Fade>
        <Fade right>
          <Button
            block
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsRescheduleModalVisible(true)}
            style={{ background: "#f759ab" }}
          >
            Reschedule Appointment
          </Button>
        </Fade>
        <Fade right>
          <Button
            block
            type="primary"
            icon={<CloseCircleOutlined />}
            onClick={() => setIsCancelModalVisible(true)}
            style={{ background: "#8c8c8c" }}
          >
            Cancel Appointment
          </Button>
        </Fade>
      </Space>
      {bookModal()}
      {rescheduleModal()}
      {cancelModal()}
    </>
  );
}
