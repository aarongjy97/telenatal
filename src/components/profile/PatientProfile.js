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

export default function PatientProfile({ profile }) {
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
        prefix: "65",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Full Name"
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
        name="dob"
        label="Date of Birth"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please input your date of birth!",
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
        name="drugAllergies"
        label="Drug Allergies"
        rules={[
          {
            type: "array",
            required: false,
            message: "Please input your drug allergies!",
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
            type: "array",
            required: false,
            message: "Please input your health conditions!",
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
            type: "array",
            required: false,
            message: "Please input your expected due date!",
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
            type: "array",
            required: false,
            message: "Please input your baby's name!",
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
            message: "Please select your baby's gender!",
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
}
