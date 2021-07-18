import React from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

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

export default function ProfessionalProfile({ profile }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
        prefix: "65",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Practitioner Name"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please input your full name!",
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
            message: "Please select gender!",
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
            type: "array",
            required: true,
            message: "Please input your place of residence!",
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
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
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
            type: "array",
            required: true,
            message: "Please input your postal code!",
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
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="clinicName"
        label="Clinic Name"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please input your clinic name!",
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
            type: "array",
            required: true,
            message: "Please input your clinic address!",
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
            type: "array",
            required: true,
            message: "Please input your clinic postal code!",
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
            type: "array",
            required: true,
            message: "Please input your medical license!",
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
            type: "array",
            required: true,
            message: "Please input your education!",
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
}
