import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  PlusOutlined,
  HeartOutlined,
  DashboardOutlined,
  ColumnWidthOutlined,
  ForkOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Fade } from "react-reveal";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { updateAppointment } from "./../../api/Appointment";
import { formatDateTime } from "../utils";

const { Panel } = Collapse;
const { Text } = Typography;
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
  const history = useHistory();

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
        setIsCreateModalVisible(false);
        history.go(0);
        history.push({
          state: { tab: "health", patient: appointment.patientId },
        });
      })
      .catch((error) => console.log(error.message));
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
          {userType === PROFESSIONAL && (
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
                      {formatDateTime(record.date)}
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
        setEditAppt(null);
        setIsEditModalVisible(false);
        history.go(0);
        history.push({
          state: { tab: "health", patient: appointment.patientId },
        });
      })
      .catch((error) => console.log(error));
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
      {userType === PROFESSIONAL && (
        <Row justify="end" style={{ paddingBottom: "20px" }}>
          <Fade>
            <Button
              type="secondary"
              onClick={() => setIsCreateModalVisible(true)}
            >
              <PlusOutlined />
              Add New Health Record
            </Button>
          </Fade>
        </Row>
      )}

      {userType === PROFESSIONAL && healthRecords && healthRecords.length > 0 && (
        <Fade bottom>
          <Collapse>
            {patientRecords
              .filter((appt, _) => {
                return appt.healthRecord != null;
              })
              .map((appt, index) => {
                return (
                  <Panel header={formatDateTime(appt?.date)} key={index}>
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
        </Fade>
      )}

      {userType === PATIENT && healthRecords && healthRecords.length > 0 && (
        <Fade bottom>
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
        </Fade>
      )}

      {(healthRecords?.length == null || healthRecords?.length === 0) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {createModal()}
      {editModal()}
    </>
  );
}
