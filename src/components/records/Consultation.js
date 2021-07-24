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
  Empty,
} from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { updateAppointment } from "./../../api/Appointment";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function Consultation({
  userType,
  consultationRecords,
  patientRecords,
}) {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editAppt, setEditAppt] = useState();
  const [form] = Form.useForm();

  const onFinishCreate = (values) => {
    const appointment = patientRecords?.find(
      (record) => record.id === values.appointmentId
    );
    const payload = {
      appointmentId: values.appointment,
      consultationRecord: {
        diagnosis: values.diagnosis,
        medication: values.medication,
        notes: values.notes,
      },
      date: appointment.date,
      location: appointment.location,
      postalCode: appointment.postalCode,
      patientId: appointment.patientId,
      professionalId: appointment.professionalId,
    };
    updateAppointment(payload)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
    setIsCreateModalVisible(false);
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
          onFinish={onFinishCreate}
        >
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an appointment to save this record under.">
              {patientRecords?.flatMap((record, _) => {
                if (record["consultationRecord"] != null) {
                  return [];
                }
                return [
                  <Option
                    value={record.appointmentId}
                    key={record.appointmentId}
                  >
                    {new Date(record.date).toUTCString()}
                  </Option>,
                ];
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

  const onFinishEdit = (values) => {
    const appointment = patientRecords?.find(
      (record) => record.appointmentId === editAppt.appointmentId
    );
    const payload = {
      appointmentId: editAppt.appointmentId,
      consultationRecord: {
        diagnosis: values.diagnosis,
        medication: values.medication,
        notes: values.notes,
      },
      date: appointment.date,
      location: appointment.location,
      postalCode: appointment.postalCode,
      patientId: appointment.patientId,
      professionalId: appointment.professionalId,
    };
    updateAppointment(payload)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
    setEditAppt(null);
    setIsEditModalVisible(false);
  };

  const editModal = () => {
    return (
      <Modal
        title="Edit Consultation"
        centered
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="consultation-edit" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form form={form} name="consultation-edit" onFinish={onFinishEdit}>
          <Form.Item
            name={["diagnosis"]}
            label="Diagnosis"
            rules={[{ required: true }]}
            initialValue={editAppt?.consultationRecord?.diagnosis}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["medication"]}
            label="Medication"
            rules={[{ required: true }]}
            initialValue={editAppt?.consultationRecord?.medication}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["notes"]}
            label="Notes"
            rules={[{ required: true }]}
            initialValue={editAppt?.consultationRecord?.notes}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      {userType === "professional" && (
        <Row justify="end" style={{ paddingBottom: "20px" }}>
          <Button
            type="secondary"
            onClick={() => setIsCreateModalVisible(true)}
          >
            <Title level={5}>Add New Consultation Record</Title>
          </Button>
        </Row>
      )}

      {userType &&
      userType === "professional" &&
      consultationRecords &&
      consultationRecords?.length > 0 ? (
        <Collapse
          defaultActiveKey={["0"]}
          style={{ marginTop: userType === "professional" ? 0 : 20 }}
        >
          {patientRecords
            .filter((appt, _) => {
              return appt.consultationRecord != null;
            })
            .map((appt, index) => {
              return (
                <Panel header={new Date(appt?.date).toUTCString()} key={index}>
                  <Row style={{ paddingBottom: "20px" }}>
                    <Col span={8}>
                      <Row>
                        <Title level={5}>Diagnosis</Title>
                      </Row>
                      <Row>
                        <Text>{appt.consultationRecord.diagnosis}</Text>
                      </Row>
                    </Col>
                    <Col flex="auto">
                      <Row>
                        <Title level={5}>Medication/Prescription</Title>
                      </Row>
                      <Row>
                        <Text>{appt.consultationRecord.medication}</Text>
                      </Row>
                    </Col>

                    {userType === "professional" && (
                      <Col justify="end">
                        <Row justify="end" style={{ paddingBottom: "20px" }}>
                          <Button
                            type="secondary"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setIsEditModalVisible(true);
                              setEditAppt(appt);
                            }}
                          >
                            <Text>Edit</Text>
                          </Button>
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Title level={5}>Notes</Title>
                  </Row>
                  <Row>
                    <Text>{appt.consultationRecord.notes}</Text>
                  </Row>
                </Panel>
              );
            })}
        </Collapse>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {userType &&
      userType === "patient" &&
      consultationRecords &&
      consultationRecords?.length > 0 ? (
        <Collapse
          defaultActiveKey={["0"]}
          style={{ marginTop: userType === "professional" ? 0 : 20 }}
        >
          {consultationRecords.map((record, index) => {
            return (
              <Panel header={record.date} key={index}>
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
                </Row>
                <Row>
                  <Title level={5}>Notes</Title>
                </Row>
                <Row>
                  <Text>{record.notes}</Text>
                </Row>
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {userType === "professional" && createModal()}
      {userType === "professional" && editModal()}
    </>
  );
}
