import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Empty,
  Spin,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  CalculatorOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Fade from "react-reveal";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { formatDateTime } from "../utils";
import { updateAppointment } from "../../api/Appointment";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function Ultrasound({
  userType,
  ultrasoundRecords,
  patientRecords,
}) {
  const history = useHistory();

  const [editAppt, setEditAppt] = useState();
  const [removePhoto, setRemovePhoto] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [predict, setPredict] = useState(false);
  const [form] = Form.useForm();

  const [showSpin, setShowSpin] = useState(false);

  const [fileList, setFilelist] = useState([]);
  const [arrayBuffer, setArrayBuffer] = useState();
  const handleUpload = ({ fileList }) => {
    if (fileList?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        let arrayBuffer = event.target.result;
        setArrayBuffer(arrayBuffer);
      };
      reader.readAsArrayBuffer(fileList?.[0].originFileObj);
    } else {
      setArrayBuffer(null);
    }
    setFilelist(fileList);
    setRemovePhoto(false);
  };

  const onFinishCreate = (values) => {
    const appointment = patientRecords?.find(
      (record) => record.appointmentId === values.appointment
    );
    const payload = {
      appointmentId: values.appointment,
      ultrasoundRecord: {
        center_x_mm: Number(values.center_x_mm),
        center_y_mm: Number(values.center_y_mm),
        semi_axes_a_mm: Number(values.semi_axes_a_mm),
        semi_axes_b_mm: Number(values.semi_axes_b_mm),
        angle_rad: Number(values.angle_rad),
      },
      date: appointment.date,
      location: appointment.location,
      postalCode: appointment.postalCode,
      patientId: appointment.patientId,
      professionalId: appointment.professionalId,
    };
    if (arrayBuffer) {
      payload["imageBuffer"] = Buffer.from(arrayBuffer).toString("base64");
    }
    updateAppointment(payload)
      .then((result) => {
        console.log(result);
        setArrayBuffer(null);
        setIsCreateModalVisible(false);
        history.go(0);
        history.push({
          state: { tab: "ultrasound", patient: appointment.patientId },
        });
      })
      .catch((error) => console.log(error));
  };

  const createModal = () => {
    return (
      <Modal
        title="Create New Ultrasound Scan Record"
        centered
        onCancel={() => setIsCreateModalVisible(false)}
        visible={isCreateModalVisible}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button form="ultrasound-create" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="ultrasound-create"
          onFinish={onFinishCreate}
        >
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an appointment to save this record under.">
              {patientRecords?.flatMap((record, _) => {
                if (record["ultrasoundRecord"] != null) {
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
          <Form.Item name="imageBuffer" label="Upload Image">
            {arrayBuffer && (
              <Image
                width={200}
                height={200}
                src={`data:image/png;base64,${Buffer.from(arrayBuffer).toString(
                  "base64"
                )}`}
              />
            )}
            <Upload
              accept=".png, .jpg, .jpeg"
              fileList={fileList}
              onChange={handleUpload}
              beforeUpload={() => false}
            >
              {!arrayBuffer && (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name={["center_x_mm"]}
            label="Center X mm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["center_y_mm"]}
            label="Center Y mm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["semi_axes_a_mm"]}
            label="Semi Axes A mm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["semi_axes_b_mm"]}
            label="Semi Axes B mm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["angle_rad"]}
            label="Angle (in rad)"
            rules={[{ required: true }]}
          >
            <Input />
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
      ultrasoundRecord: {
        center_x_mm: Number(values.center_x_mm),
        center_y_mm: Number(values.center_y_mm),
        semi_axes_a_mm: Number(values.semi_axes_a_mm),
        semi_axes_b_mm: Number(values.semi_axes_b_mm),
        angle_rad: Number(values.angle_rad),
      },
      date: appointment.date,
      location: appointment.location,
      postalCode: appointment.postalCode,
      patientId: appointment.patientId,
      professionalId: appointment.professionalId,
    };
    if (arrayBuffer) {
      payload["imageBuffer"] = Buffer.from(arrayBuffer).toString("base64");
    } else if (appointment?.imageBuffer) {
      payload["imageBuffer"] = appointment?.imageBuffer;
    }
    console.log(payload["imageBuffer"]);
    updateAppointment(payload)
      .then((result) => {
        console.log(result);
        setEditAppt(null);
        setArrayBuffer(null);
        setIsEditModalVisible(false);
        history.go(0);
        history.push({
          state: { tab: "ultrasound", patient: appointment.patientId },
        });
      })
      .catch((error) => console.log(error));
  };

  const editModal = () => {
    return (
      <Modal
        title="Edit Ultrasound Record"
        centered
        visible={isEditModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsEditModalVisible(false);
              setRemovePhoto(false);
              setArrayBuffer(null);
              setFilelist([]);
            }}
          >
            Cancel
          </Button>,
          <Button form="ultrasound-edit" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
        onCancel={() => {
          setIsEditModalVisible(false);
          setRemovePhoto(false);
          setArrayBuffer(null);
          setFilelist([]);
        }}
      >
        <Form form={form} name="ultrasound-edit" onFinish={onFinishEdit}>
          <Form.Item name="imageBuffer" label="Upload Image">
            {!removePhoto && (arrayBuffer || editAppt?.imageBuffer) && (
              <Col>
                <Row>
                  <Image
                    width={200}
                    height={200}
                    src={`data:image/png;base64,${Buffer.from(
                      arrayBuffer ?? editAppt?.imageBuffer.data
                    ).toString("base64")}`}
                  />
                </Row>
                {!arrayBuffer && (
                  <Row style={{ paddingTop: 20 }}>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => setRemovePhoto(true)}
                    >
                      Delete
                    </Button>
                  </Row>
                )}
              </Col>
            )}
            <Upload
              accept=".png, .jpg, .jpeg"
              fileList={fileList}
              onChange={handleUpload}
              beforeUpload={() => false}
            >
              {!arrayBuffer && (removePhoto || !editAppt?.imageBuffer) && (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name={["center_x_mm"]}
            label="Center X mm"
            rules={[{ required: true }]}
            initialValue={editAppt?.ultrasoundRecord?.center_x_mm}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["center_y_mm"]}
            label="Center Y mm"
            rules={[{ required: true }]}
            initialValue={editAppt?.ultrasoundRecord?.center_y_mm}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["semi_axes_a_mm"]}
            label="Semi Axes A mm"
            rules={[{ required: true }]}
            initialValue={editAppt?.ultrasoundRecord?.semi_axes_a_mm}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["semi_axes_b_mm"]}
            label="Semi Axes B mm"
            rules={[{ required: true }]}
            initialValue={editAppt?.ultrasoundRecord?.semi_axes_b_mm}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["angle_rad"]}
            label="Angle (in rad)"
            rules={[{ required: true }]}
            initialValue={editAppt?.ultrasoundRecord?.angle_rad}
          >
            <Input />
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
              Add New Ultrasound Scan Record
            </Button>
          </Fade>
        </Row>
      )}

      {userType === PROFESSIONAL &&
        ultrasoundRecords &&
        ultrasoundRecords?.length > 0 && (
          <Fade bottom>
            <Collapse
              style={{ marginTop: userType === PROFESSIONAL ? 0 : 20 }}
              onChange={() => setPredict(false)}
            >
              {patientRecords
                .filter((appt, _) => {
                  return appt.ultrasoundRecord != null;
                })
                .map((appt, index) => {
                  return (
                    <Panel header={formatDateTime(appt?.date)} key={index}>
                      <Row style={{ paddingBottom: "20px" }}>
                        {appt?.imageBuffer && (
                          <Col span={6} style={{ paddingLeft: 20 }}>
                            <Row>
                              <Title level={5}>Image</Title>
                            </Row>
                            <Row>
                              <Image
                                width={200}
                                height={200}
                                src={`data:image/png;base64,${Buffer.from(
                                  appt.imageBuffer.data
                                ).toString("base64")}`}
                              />
                            </Row>
                            <Row style={{ paddingTop: "20px" }}>
                              <Button
                                type="secondary"
                                icon={<CalculatorOutlined />}
                                onClick={() => {
                                  setShowSpin(true);
                                  console.log(showSpin);
                                  setTimeout(() => {
                                    setPredict(true);
                                    setShowSpin(false);
                                  }, 3000);
                                }}
                              >
                                <Text>Generate Measurements</Text>
                              </Button>
                            </Row>
                          </Col>
                        )}
                        {showSpin && (
                          <Col span={6} style={{ paddingLeft: 30, paddingTop: 100 }}>
                            <Spin size="large"/>
                          </Col>
                        )}
                        {predict && (
                          <Col span={6} flex="auto" style={{ paddingLeft: 10, paddingTop: 10 }}>
                            <Row>
                              <Title level={5}>Center X (in mm)</Title>
                            </Row>
                            <Row>
                              <Text>{appt.ultrasoundRecord.center_x_mm}</Text>
                            </Row>
                            <Row>
                              <Title level={5}>Center Y (in mm)</Title>
                            </Row>
                            <Row>
                              <Text>{appt.ultrasoundRecord.center_y_mm}</Text>
                            </Row>
                            <Row>
                              <Title level={5}>Semi Axes A (in mm)</Title>
                            </Row>
                            <Row>
                              <Text>
                                {appt.ultrasoundRecord.semi_axes_a_mm}
                              </Text>
                            </Row>
                            <Row>
                              <Title level={5}>Semi Axes B (in mm)</Title>
                            </Row>
                            <Row>
                              <Text>
                                {appt.ultrasoundRecord.semi_axes_b_mm}
                              </Text>
                            </Row>
                            <Row>
                              <Title level={5}>Angle (in rad)</Title>
                            </Row>
                            <Row>
                              <Text>{appt.ultrasoundRecord.angle_rad}</Text>
                            </Row>
                          </Col>
                        )}
                      </Row>
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
                    </Panel>
                  );
                })}
            </Collapse>
          </Fade>
        )}

      {userType === PATIENT &&
        ultrasoundRecords &&
        ultrasoundRecords?.length > 0 && (
          <Fade bottom>
            <Collapse style={{ marginTop: userType === PROFESSIONAL ? 0 : 20 }}>
              {patientRecords
                .filter((appt, _) => {
                  return appt.ultrasoundRecord != null;
                })
                .map((appt, index) => {
                  return (
                    <Panel header={formatDateTime(appt?.date)} key={index}>
                      <Row style={{ paddingBottom: "20px" }}>
                        {appt?.imageBuffer && (
                          <Col span={6} style={{ paddingLeft: 20 }}>
                            <Row>
                              <Title level={5}>Image</Title>
                            </Row>
                            <Row>
                              <Image
                                width={200}
                                height={200}
                                src={`data:image/png;base64,${Buffer.from(
                                  appt.imageBuffer.data
                                ).toString("base64")}`}
                              />
                            </Row>
                          </Col>
                        )}
                        <Col span={6} flex="auto" style={{ paddingLeft: 10 }}>
                          <Row>
                            <Title level={5}>Center X mm</Title>
                          </Row>
                          <Row>
                            <Text>{appt.ultrasoundRecord.center_x_mm}</Text>
                          </Row>
                          <Row>
                            <Title level={5}>Center Y mm</Title>
                          </Row>
                          <Row>
                            <Text>{appt.ultrasoundRecord.center_y_mm}</Text>
                          </Row>
                          <Row>
                            <Title level={5}>Semi Axes A mm</Title>
                          </Row>
                          <Row>
                            <Text>{appt.ultrasoundRecord.semi_axes_a_mm}</Text>
                          </Row>
                          <Row>
                            <Title level={5}>Semi Axes B mm</Title>
                          </Row>
                          <Row>
                            <Text>{appt.ultrasoundRecord.semi_axes_b_mm}</Text>
                          </Row>
                          <Row>
                            <Title level={5}>Angle (in rad)</Title>
                          </Row>
                          <Row>
                            <Text>{appt.ultrasoundRecord.angle_rad}</Text>
                          </Row>
                        </Col>
                      </Row>
                    </Panel>
                  );
                })}
            </Collapse>
          </Fade>
        )}

      {(ultrasoundRecords?.length == null ||
        ultrasoundRecords?.length === 0) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {userType === PROFESSIONAL && createModal()}
      {userType === PROFESSIONAL && editModal()}
    </>
  );
}
