import React, { useState } from "react";
import { Layout, Upload, Button, message, Avatar, Form, Row, Col, Input, Cascader, Select, Checkbox, AutoComplete } from "antd";
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;

const patientProfile = {
  "patientId": "PA0001",
  "name": "Lee Ji Eun",
  "email": "jieunlee@naver.co.kr",
  "phone": "98765432",
  "profileImage": "avatar.jpg",
  "dob": "1995-12-09",
  "address": "Coex Artium, Gangnam-gu, Seoul",
  "postalCode": "57132",
  "drugAllergies": null,
  "healthConditions": null,
  "dueDate": "2021-12-03",
  "babyName": "Eve",
  "babyGender": "Undetermined",
  "professionalId": "PR0001"
};

const professionalProfile = {
  "professionalId": "PR0001",
  "type": "doctor",
  "name": "Park Chan Yeol",
  "email": "chanyeol@naver.co.kr",
  "address": "Wall Street",
  "postalCode": "123456",
  "phone": "98765432",
  "gender": "Male",
  "profileImage": "avatar.jpg",
  "education": "Seoul National University, Masters in Medicine",
  "medicalLicenseNo": "L1485",
  "clinicName": "SM Entertainment Clinic",
  "clinicAddress": "SM Entertainment Building, Gangnam-gu, Seoul",
  "clinicPostalCode": "123456"
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 20,
    },
    sm: {
      span: 14,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const user = "PATIENT";
const profile = patientProfile;

const Uploader = () => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Upload Profile Image to DB

    // Pull and refresh
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  return (
    <ImgCrop grid>
      <Upload
        fileList={fileList}
        accept={"image/jpeg","image/png"}
        beforeUpload= {beforeUpload}
        onChange={onChange}
        onPreview={onPreview}
        showUploadList={false}>
        <Button icon={<UploadOutlined />}>Update Profile Image</Button>
      </Upload>
    </ImgCrop>
  );
};

const PatientDetails = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="65">+65</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        name: profile.name,
        address: profile.address,
        dob: profile.dob,
        email: profile.email,
        postalCode: profile.postalCode,
        phone: profile.phone,
        drugAllergies: profile.drugAllergies,
        healthConditions: profile.healthConditions,
        dueDate: profile.dueDate,
        babyName: profile.babyName,
        babyGender: profile.babyGender,
        prefix: '65',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Full Name"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your full name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your place of residence!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your date of birth!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="postalCode"
        label="Postal Code"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your postal code!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="drugAllergies"
        label="Drug Allergies"
        rules={[
          {
            type: 'array',
            required: false,
            message: 'Please input your drug allergies!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="healthConditions"
        label="Health Conditions"
        rules={[
          {
            type: 'array',
            required: false,
            message: 'Please input your health conditions!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Expected Due Date"
        rules={[
          {
            type: 'array',
            required: false,
            message: 'Please input your expected due date!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="babyName"
        label="Baby's Name"
        rules={[
          {
            type: 'array',
            required: false,
            message: 'Please input your baby\'s name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="babyGender"
        label="Baby's Gender"
        rules={[
          {
            required: false,
            message: 'Please select your baby\'s gender!',
          },
        ]}
      >
        <Select placeholder="Select your baby's gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Undetermined</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save update
        </Button>
      </Form.Item>
    </Form>
  );
};

const ProfessionalDetails = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="65">+65</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="professionalProfile"
      onFinish={onFinish}
      initialValues={{
        name: profile.name,
        gender: profile.gender,
        address: profile.address,
        email: profile.email,
        postalCode: profile.postalCode,
        phone: profile.phone,
        clinicName: profile.clinicName,
        clinicAddress: profile.clinicAddress,
        clinicPostalCode: profile.clinicPostalCode,
        medicalLicense: profile.medicalLicenseNo,
        education: profile.education,
        prefix: '65',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Practitioner Name"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your full name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your place of residence!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="postalCode"
        label="Postal Code"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your postal code!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="clinicName"
        label="Clinic Name"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your clinic name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="clinicAddress"
        label="Clinic Address"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your clinic address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="clinicPostalCode"
        label="Clinic Postal Code"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your clinic postal code!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="medicalLicense"
        label="Medical License No."
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your medical license!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="education"
        label="Education"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please input your education!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function Profile() {

  return (
    <Layout>
      <Row>
        <Col className="profile-left" span={14}>
          {user === "DOCTOR" && (
            <ProfessionalDetails/>
          )}
          {user === "PATIENT" && (
            <PatientDetails/>
          )}
        </Col>
        <Col className="profile-right" span={6}>
          <div className="profile-image">
            <Avatar
              size={{
                xs: 48,
                sm: 64,
                md: 84,
                lg: 120,
                xl: 180,
                xxl: 220,
              }}
              src={profile.profileImage} alt="Profile" />
          </div>
          <div className="profile-button">
            <Uploader />
          </div>
        </Col>
        <Col span={4}>
        </Col>
      </Row>
    </Layout>
  );
}
