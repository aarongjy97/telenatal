import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Fade from "react-reveal";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { updateAppointment } from "../../api/Appointment";
import { formatDateTime } from "../utils";

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function MedicalTest({ userType, testRecords, patientRecords }) {
  const history = useHistory();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editAppt, setEditAppt] = useState();

  const testCategories = [
    "Urine test",
    "Blood test",
    "Group B streptococcus infection screening",
    "Glucose challenge screening",
    "Chromosomal & neural tube screening",
    "Kick counts",
    "Non-stress test",
  ];
  const onFinishCreate = (values) => {
    const appointment = patientRecords?.find(
      (record) => record.appointmentId === values.appointment
    );
    const payload = {
      appointmentId: values.appointment,
      testRecord: {
        time: new Date(appointment.date).getTime(),
        testName: values.testName,
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
        setIsCreateModalVisible(false);
        history.go(0);
        history.push({
          state: { tab: "test", patient: appointment.patientId },
        });
      })
      .catch((error) => console.log(error));
  };

  const createModal = () => {
    return (
      <Modal
        title="Create New Medical Test Record"
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
          onFinish={onFinishCreate}
        >
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an appointment to save this record under.">
              {patientRecords?.flatMap((record, _) => {
                if (record["testRecord"] != null) {
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
          <Form.Item
            name={["testName"]}
            label="Test Name"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an test category.">
              {testCategories?.map((test, idx) => {
                return (
                  <Option value={test} key={idx}>
                    {test}
                  </Option>
                );
              })}
            </Select>
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
      testRecord: {
        time: new Date(appointment.date).getTime(),
        testName: values.testName,
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
        setEditAppt(null);
        setIsEditModalVisible(false);
        history.go(0);
        history.push({
          state: { tab: "test", patient: appointment.patientId },
        });
      })
      .catch((error) => console.log(error));
  };

  const editModal = () => {
    return (
      <Modal
        title="Edit Test Results"
        centered
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="test-edit" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form form={form} name="test-edit" onFinish={onFinishEdit}>
          <Form.Item
            name={["testName"]}
            label="Test Name"
            rules={[{ required: true }]}
            initialValue={editAppt?.testRecord?.testName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["notes"]}
            label="Notes"
            rules={[{ required: true }]}
            initialValue={editAppt?.testRecord?.notes}
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
              Add New Medical Test Record
            </Button>
          </Fade>
        </Row>
      )}

      {userType === PROFESSIONAL && testRecords && testRecords?.length > 0 && (
        <Fade bottom>
          <Collapse style={{ marginTop: 0 }}>
            {patientRecords
              .filter((appt) => appt?.testRecord != null)
              .map((appt, index) => {
                return (
                  <Panel header={formatDateTime(appt?.date)} key={index}>
                    <Row>
                      <Col flex="auto">
                        <Divider orientation="left">Test</Divider>
                      </Col>
                      {userType === PROFESSIONAL && (
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
                      )}
                    </Row>
                    <Row style={{ paddingBottom: 20 }}>
                      <Text>{appt.testRecord.testName}</Text>
                    </Row>
                    <Divider orientation="left">Notes</Divider>
                    <Row>
                      <Text>{appt.testRecord.notes}</Text>
                    </Row>
                  </Panel>
                );
              })}
          </Collapse>
        </Fade>
      )}

      {userType === PATIENT && testRecords && testRecords?.length > 0 && (
        <Fade bottom>
          <Collapse defaultActiveKey={["1"]} style={{ marginTop: 20 }}>
            {testRecords.map((record, index) => {
              return (
                <Panel header={record.date} key={index}>
                  <Row>
                    <Col flex="auto">
                      <Divider orientation="left">Test</Divider>
                    </Col>
                    {userType === PROFESSIONAL && (
                      <Col justify="end" style={{ paddingLeft: "15px" }}>
                        <Button
                          type="secondary"
                          onClick={() => setIsEditModalVisible(true)}
                          icon={<EditOutlined />}
                        >
                          <Text>Edit</Text>
                        </Button>
                      </Col>
                    )}
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
        </Fade>
      )}

      {(testRecords?.length == null || testRecords?.length === 0) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {userType === PROFESSIONAL && createModal()}
      {userType === PROFESSIONAL && editModal()}
    </>
  );
}
