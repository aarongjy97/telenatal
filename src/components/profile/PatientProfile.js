import React from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 6,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 12,
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
    if (typeof profile === 'undefined') {
      // make POST request to create profile
    } else {
      // make POST request to update profile
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +65
    </Form.Item>
  );

  const dateFormat = 'YYYY-MM-DD';

  var initialValues = {}
  if (typeof profile != 'undefined') {
    initialValues = {
      name: profile.name,
      address: profile.address,
      email: profile.email,
      postalCode: profile.postalCode,
      phone: profile.phone,
      drugAllergies: profile.drugAllergies,
      healthConditions: profile.healthConditions,
      babyName: profile.babyName,
      babyGender: profile.babyGender
    }
  }

  var defaultDob =
    typeof profile == 'undefined'
    ? null
    : moment(profile.dob, dateFormat);

  var defaultDueDate =
    typeof profile == 'undefined'
    ? null
    : moment(profile.dueDate, dateFormat);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="patientProfile"
      onFinish={onFinish}
      initialValues={initialValues}
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

      {typeof profile == 'undefined' &&
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        }

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
            required: true,
            message: "Please input your date of birth!",
          },
        ]}
      >
        <DatePicker defaultValue={defaultDob} format={'YYYY-MM-DD'} />
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

      <Form.Item
        name="dueDate"
        label="Expected Due Date"
        rules={[
          {
            required: false,
            message: "Please input your expected due date!",
          },
        ]}
      >
        <DatePicker defaultValue={defaultDueDate} format={'YYYY-MM-DD'} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {typeof profile == 'undefined'
          ?
          <>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="default" href="/">
              Back to Home
            </Button>
            <Button type="link" href="/login">
              Have an account? Login instead
            </Button>
          </>
          :
          <>
            <Button type="primary" htmlType="submit">
              Save update
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="default"
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear changes
            </Button>
          </>
        }
      </Form.Item>
    </Form>
  );
}
