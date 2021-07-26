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
} from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import Fade from "react-reveal";
import { PROFESSIONAL } from "../../constants/constants";
import { formatDate } from "../utils";

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

const records = [
  {
    time: "6 Jul 2021, 6.30pm",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/CRL_Crown_rump_length_12_weeks_ecografia_Dr._Wolfgang_Moroder.jpg",
    notes: "Fetal growth normal, able to identify that baby has a huge head! ",
  },
  {
    time: "5 Jul 2021, 4.30pm",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/CRL_Crown_rump_length_12_weeks_ecografia_Dr._Wolfgang_Moroder.jpg",
    notes: "Fetal growth normal, able to identify that baby has a huge head! ",
  },
  {
    time: "20 Jun 2021, 8.00am",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/CRL_Crown_rump_length_12_weeks_ecografia_Dr._Wolfgang_Moroder.jpg",
    notes: "Fetal growth normal, able to identify that baby has a huge head! ",
  },
];
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
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          onFinish={onFinish}
        >
          <Form.Item
            name="appointment"
            label="Appointment"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an appointment to save this record under.">
              {records.map((record, _) => {
                return <Option value={record.time}>{record.time}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload Image"
            rules={[{ required: true }]}
          >
            <Upload accept=".png, .jpg, .jpeg">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
            name={["description"]}
            label="Description"
            rules={[{ required: true }]}
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
              Add New Ultrasound Scan Record
            </Button>
          </Fade>
        </Row>
      )}
      <Fade bottom>
        <Collapse
          defaultActiveKey={["1"]}
          style={{ marginTop: userType === PROFESSIONAL ? 0 : 20 }}
        >
          {records.map((record, index) => {
            return (
              <Panel header={record.time} key={index}>
                <Row style={{ paddingBottom: "20px" }}>
                  <Col span={6} style={{ paddingLeft: 20 }}>
                    <Row>
                      <Title level={5}>Image</Title>
                    </Row>
                    <Row>
                      <Image width={200} height={200} src={record.image} />
                    </Row>
                  </Col>
                  <Col span={6} flex="auto" style={{ paddingLeft: 10 }}>
                    <Row>
                      <Title level={5}>Notes</Title>
                    </Row>
                    <Row>
                      <Text>{record.notes}</Text>
                    </Row>
                  </Col>

                  <Col span={6} style={{ paddingLeft: 20 }}>
                    <Row>
                      <Title level={5}>Image</Title>
                    </Row>
                    <Row>
                      <Image width={200} height={200} src={record.image} />
                    </Row>
                  </Col>
                  <Col span={6} style={{ paddingLeft: 10 }}>
                    <Row>
                      <Title level={5}>Notes</Title>
                    </Row>
                    <Row>
                      <Text>{record.notes}</Text>
                    </Row>
                  </Col>
                </Row>
                {userType === PROFESSIONAL && (
                  <Row justify="end" style={{ paddingBottom: "20px" }}>
                    <Button
                      type="secondary"
                      icon={<EditOutlined />}
                      onClick={() => setIsEditModalVisible(true)}
                    >
                      <Text>Edit</Text>
                    </Button>
                  </Row>
                )}
              </Panel>
            );
          })}
        </Collapse>
      </Fade>
      {userType === PROFESSIONAL && createModal()}
      {userType === PROFESSIONAL && editModal()}
    </>
  );
}
