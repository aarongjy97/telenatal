import React, { useState } from "react";
import {
  Divider,
  Tooltip,
  Collapse,
  Row,
  Col,
  Card,
  Layout,
  Statistic,
  Typography,
  Modal,
  Button,
  Form,
  Select,
  Input,
  Empty,
} from "antd";
import {
  HeartOutlined,
  DashboardOutlined,
  ColumnWidthOutlined,
  ForkOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { updateAppointment } from "./../../api/Appointment";
import {formatDate} from '../utils';

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
export default function HealthRecord({
  userType,
  healthRecords,
  patientRecords,
}) {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editAppt, setEditAppt] = useState();
  const [form] = Form.useForm();

  const onFinishCreate = (values) => {
    const appointment = patientRecords?.find(
      (record) => record.appointmentId === values.appointment
    );
    const payload = {
      appointmentId: values.appointment,
      healthRecord: {
        weight: Number(values.weight),
        waistMeasurement: Number(values.waistMeasurement),
        heartRate: Number(values.heartRate),
        bloodPressure: Number(values.bloodPressure),
        notes: values.notes ?? "NIL",
        dateTime: new Date(appointment.date).getTime(),
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
      .catch((error) => console.log(error.message));
    setIsCreateModalVisible(false);
  };

  const createModal = () => {
    return (
      <Modal
        title="Create New Health Record"
        centered
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="health-record-create" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="health-record-create"
          onFinish={onFinishCreate}
        >
          {userType === "professional" && (
            <Form.Item
              name="appointment"
              label="Appointment"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select an appointment to save this record under.">
                {patientRecords?.flatMap((record, _) => {
                  if (record["healthRecord"] != null) {
                    return [];
                  }
                  return [
                    <Option
                      value={record.appointmentId}
                      key={record.appointmentId}
                    >
                      {formatDate(record.date)}
                    </Option>,
                  ];
                })}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name={["weight"]}
            label="Weight"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["waistMeasurement"]}
            label="Waist Measurement (cm)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["heartRate"]}
            label="Heart Rate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["bloodPressure"]}
            label="Blood Pressure"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["notes"]} label="Notes">
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
      healthRecord: {
        weight: Number(values.weight),
        waistMeasurement: Number(values.waistMeasurement),
        heartRate: Number(values.heartRate),
        bloodPressure: Number(values.bloodPressure),
        notes: values.notes ?? "NIL",
        dateTime: new Date(appointment.date).getTime(),
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
        title="Edit Health Record"
        centered
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="health-record-edit" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form form={form} name="health-record-edit" onFinish={onFinishEdit}>
          <Form.Item
            name={["weight"]}
            label="Weight"
            rules={[{ required: true }]}
            initialValue={editAppt?.healthRecord?.weight}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["waistMeasurement"]}
            label="Waist Measurement (cm)"
            rules={[{ required: true }]}
            initialValue={editAppt?.healthRecord?.waistMeasurement}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["heartRate"]}
            label="Heart Rate"
            rules={[{ required: true }]}
            initialValue={editAppt?.healthRecord?.heartRate}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["bloodPressure"]}
            label="Blood Pressure"
            rules={[{ required: true }]}
            initialValue={editAppt?.healthRecord?.bloodPressure}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["notes"]}
            label="Notes"
            initialValue={editAppt?.healthRecord?.notes}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      <Row justify="end" style={{ paddingBottom: "20px" }}>
        <Button type="secondary" onClick={() => setIsCreateModalVisible(true)}>
          <Title level={5}>Add New Health Record</Title>
        </Button>
      </Row>

      {userType === "professional" &&
        healthRecords &&
        healthRecords.length > 0 && (
          <Collapse defaultActiveKey={["0"]}>
            {patientRecords
              .filter((appt, _) => {
                return appt.healthRecord != null;
              })
              .map((appt, index) => {
                return (
                  <Panel
                    header={formatDate(appt?.date)}
                    key={index}
                  >
                    <Row style={{ paddingBottom: "20px" }}>
                      <Col flex="auto">
                        <Divider orientation="left">Health Readings</Divider>
                      </Col>
                      <Col justify="end" style={{ paddingLeft: "15px" }}>
                        <Button
                          type="secondary"
                          onClick={() => {
                            setIsEditModalVisible(true);
                            setEditAppt(appt);
                          }}
                          icon={<EditOutlined />}
                        >
                          <Text>Edit</Text>
                        </Button>
                      </Col>
                    </Row>
                    <Row style={{ paddingBottom: "20px" }} gutter={24}>
                      <Col span={6}>
                        <Row>
                          <Layout
                            className="layout"
                            style={{ minHeight: "10vh" }}
                          >
                            <Tooltip
                              title="Your weight is entering the abnormal range. Please consult your doctor during your subsequent appointment."
                              color="#b86f1b"
                              key="bp"
                            >
                              <Card>
                                <Statistic
                                  title="Weight"
                                  value={appt.healthRecord.weight}
                                  precision={0}
                                  prefix={<DashboardOutlined />}
                                  valueStyle={{ color: "#b86f1b" }}
                                  suffix="kg"
                                />
                              </Card>
                            </Tooltip>
                          </Layout>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Layout
                            className="layout"
                            style={{ minHeight: "10vh" }}
                          >
                            <Tooltip
                              title="Your waist measurement is in the normal range!"
                              color="#1d8a25"
                              key="bp"
                            >
                              <Card>
                                <Statistic
                                  title="Waist Measurement"
                                  value={appt.healthRecord.waistMeasurement}
                                  precision={0}
                                  prefix={<ColumnWidthOutlined />}
                                  valueStyle={{ color: "#1d8a25" }}
                                  suffix="inches"
                                />
                              </Card>
                            </Tooltip>
                          </Layout>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Layout
                            className="layout"
                            style={{ minHeight: "10vh" }}
                          >
                            <Tooltip
                              title="Your heart rate is in the normal range!"
                              color="#1d8a25"
                              key="bp"
                            >
                              <Card>
                                <Statistic
                                  title="Resting Heart Rate"
                                  value={appt.healthRecord.heartRate}
                                  precision={0}
                                  prefix={<HeartOutlined />}
                                  valueStyle={{ color: "#1d8a25" }}
                                  suffix="bpm"
                                />
                              </Card>
                            </Tooltip>
                          </Layout>
                        </Row>
                      </Col>
                      <Col span={6}>
                        <Row>
                          <Layout
                            className="layout"
                            style={{ minHeight: "10vh" }}
                          >
                            <Tooltip
                              title="Your blood pressure is in the abnormal range. Please consult your doctor during your subsequent appointment."
                              color="#ad0e2d"
                              key="bp"
                            >
                              <Card>
                                <Statistic
                                  title="Blood Pressure"
                                  value={appt.healthRecord.bloodPressure}
                                  precision={0}
                                  prefix={<ForkOutlined />}
                                  valueStyle={{ color: "#ad0e2d" }}
                                  suffix="mm Hg"
                                />
                              </Card>
                            </Tooltip>
                          </Layout>
                        </Row>
                      </Col>
                    </Row>

                    <Divider orientation="left">Notes</Divider>
                    <Row>
                      <Text>{appt.healthRecord.notes}</Text>
                    </Row>
                  </Panel>
                );
              })}
          </Collapse>
        )}

      {userType === "patient" && healthRecords && healthRecords.length > 0 && (
        <Collapse defaultActiveKey={["0"]}>
          {healthRecords.map((record, index) => {
            return (
              <Panel header={record.date} key={index}>
                <Row style={{ paddingBottom: "20px" }}>
                  <Col flex="auto">
                    <Divider orientation="left">Health Readings</Divider>
                  </Col>
                </Row>
                <Row style={{ paddingBottom: "20px" }} gutter={24}>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Tooltip
                          title="Your weight is entering the abnormal range. Please consult your doctor during your subsequent appointment."
                          color="#b86f1b"
                          key="bp"
                        >
                          <Card>
                            <Statistic
                              title="Weight"
                              value={record.weight}
                              precision={0}
                              prefix={<DashboardOutlined />}
                              valueStyle={{ color: "#b86f1b" }}
                              suffix="kg"
                            />
                          </Card>
                        </Tooltip>
                      </Layout>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Tooltip
                          title="Your waist measurement is in the normal range!"
                          color="#1d8a25"
                          key="bp"
                        >
                          <Card>
                            <Statistic
                              title="Waist Measurement"
                              value={record.waistMeasurement}
                              precision={0}
                              prefix={<ColumnWidthOutlined />}
                              valueStyle={{ color: "#1d8a25" }}
                              suffix="inches"
                            />
                          </Card>
                        </Tooltip>
                      </Layout>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Tooltip
                          title="Your heart rate is in the normal range!"
                          color="#1d8a25"
                          key="bp"
                        >
                          <Card>
                            <Statistic
                              title="Resting Heart Rate"
                              value={record.heartRate}
                              precision={0}
                              prefix={<HeartOutlined />}
                              valueStyle={{ color: "#1d8a25" }}
                              suffix="bpm"
                            />
                          </Card>
                        </Tooltip>
                      </Layout>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Layout className="layout" style={{ minHeight: "10vh" }}>
                        <Tooltip
                          title="Your blood pressure is in the abnormal range. Please consult your doctor during your subsequent appointment."
                          color="#ad0e2d"
                          key="bp"
                        >
                          <Card>
                            <Statistic
                              title="Blood Pressure"
                              value={record.bloodPressure}
                              precision={0}
                              prefix={<ForkOutlined />}
                              valueStyle={{ color: "#ad0e2d" }}
                              suffix="mm Hg"
                            />
                          </Card>
                        </Tooltip>
                      </Layout>
                    </Row>
                  </Col>
                </Row>

                <Divider orientation="left">Notes</Divider>
                <Row>
                  <Text>{record.notes}</Text>
                </Row>
              </Panel>
            );
          })}
        </Collapse>
      )}

      {(healthRecords?.length == null || healthRecords?.length === 0) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {createModal()}
      {editModal()}
    </>
  );
}
