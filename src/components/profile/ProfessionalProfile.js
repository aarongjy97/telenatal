import React from "react";
import { Button, Form, Input, Select, Radio } from "antd";

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

export default function ProfessionalProfile({ profile }) {
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

  var initialValues = {}
  if (typeof profile != 'undefined') {
    initialValues = {
      name: profile.name,
      gender: profile.gender,
      type: profile.type,
      address: profile.address,
      email: profile.email,
      postalCode: profile.postalCode,
      phone: profile.phone,
      clinicName: profile.clinicName,
      clinicAddress: profile.clinicAddress,
      clinicPostalCode: profile.clinicPostalCode,
      medicalLicense: profile.medicalLicenseNo,
      education: profile.education
    }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="professionalProfile"
      onFinish={onFinish}
      initialValues={initialValues}
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
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
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
        name="type"
        label="Practitioner Type"
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
        name="type"
        label="Practitioner Type"
        rules={[
          {
            required: true,
            message: "Please select your practitioner type!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value={1}>Doctor</Radio>
          <Radio value={2}>Nurse</Radio>
        </Radio.Group>
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
        {typeof profile === 'undefined' &&
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
        }
        {typeof profile !== 'undefined' &&
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
