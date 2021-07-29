import React, { useState, useEffect } from "react";
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
} from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import Fade from "react-reveal";
import { PROFESSIONAL } from "../../constants/constants";
import { formatDateTime } from "../utils";
import { updateAppointment, getAppointment } from "../../api/Appointment";

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

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFilelist] = useState([]);
  const [arrayBuffer, setArrayBuffer] = useState();
  const handleUpload = ({ fileList }) => {
    console.log("fileList", fileList);
    console.log(fileList?.[0]?.originFileObj);
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
  };
  console.log(arrayBuffer);

  const [appointment, setAppointment] = useState();
  useEffect(() => {
    getAppointment("3f949cdc-657e-4357-8c23-af974d4417da")
      .then((result) => {
        setAppointment(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
      payload["imageBuffer"] = arrayBuffer;
    }
    updateAppointment(payload)
      .then((result) => {
        console.log(result);
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
          <Form.Item
            name="imageBuffer"
            label="Upload Image"
          >
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

  const editModal = () => {
    return (
      <Modal
        title="Edit Ultrasound Record"
        centered
        visible={isEditModalVisible}
        onOk={() => setIsEditModalVisible(false)}
        okText="Submit"
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} name="ultrasound-edit" onFinish={() => {}}>
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
            <Collapse style={{ marginTop: userType === PROFESSIONAL ? 0 : 20 }}>
              {patientRecords
                .filter((appt, _) => {
                  return appt.ultrasoundRecord != null;
                })
                .map((appt, index) => {
                  return (
                    <Panel header={formatDateTime(appt?.date)} key={index}>
                      <Row style={{ paddingBottom: "20px" }}>
                        {appointment?.imageBuffer && (
                          <Col span={6} style={{ paddingLeft: 20 }}>
                            <Row>
                              <Title level={5}>Image</Title>
                            </Row>
                            <Row>
                              <Image
                                width={200}
                                height={200}
                                src={`data:image/png;base64,${Buffer.from(
                                  appointment.imageBuffer.data
                                ).toString("base64")}`}
                              />
                            </Row>
                          </Col>
                        )}
                        <Col span={6} flex="auto" style={{ paddingLeft: 10 }}>
                          <Row>
                            <Title level={5}>center_x_mm</Title>
                          </Row>
                          <Row>
                            <Text>{appt.ultrasoundRecord.center_x_mm}</Text>
                          </Row>
                        </Col>
                      </Row>
                      <Row justify="end" style={{ paddingBottom: "20px" }}>
                        <Button
                          type="secondary"
                          icon={<EditOutlined />}
                          onClick={() => setIsEditModalVisible(true)}
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

      {(ultrasoundRecords?.length == null ||
        ultrasoundRecords?.length === 0) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      {userType === PROFESSIONAL && createModal()}
      {userType === PROFESSIONAL && editModal()}
    </>
  );
}
