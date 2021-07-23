import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, DatePicker, InputNumber } from "antd";
import { registerPatient } from "../../api/Auth";
import {
  healthConditionsList,
  drugAllergiesList,
  formItemLayout,
  tailFormItemLayout,
} from "./constants";

const { Option } = Select;

export default function PatientRegister() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const onRegistration = (values) => {
    // TODO: fix all the optional/undefined values
    registerPatient(
      values.name,
      values.password,
      values.email,
      values.phone,
      values.dob.valueOf(),
      values.address,
      values.postalCode
    )
      .then((result) => {
        console.log(result);
        setErrorMessage();
        history.push("/login");
      })
      .catch((error) => setErrorMessage(error.response.data));
  };

  // Load options for drug allergies
  const drugAllergiesOptions = [];
  for (let index in drugAllergiesList) {
    let drugAllergy = drugAllergiesList[index];
    drugAllergiesOptions.push(<Option key={drugAllergy}>{drugAllergy}</Option>);
  }

  // Load options for health conditions
  const healthConditionsOptions = [];
  for (let index in healthConditionsList) {
    let healthCondition = healthConditionsList[index];
    healthConditionsOptions.push(
      <Option key={healthCondition}>{healthCondition}</Option>
    );
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="patientProfile"
      onFinish={onRegistration}
      scrollToFirstError
    >
      <p>About you</p>

      <Form.Item
        name="name"
        label="Full Name"
        rules={[
          {
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
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please input your place of residence!",
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
            required: true,
            message: "Please input your postal code!",
          },
        ]}
      >
        <InputNumber min={100000} max={999999} />
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
        <DatePicker
          format={"D MMM YYYY"}
          allowClear={false}
          disabledDate={(current) => {
            return current > moment().startOf("day").subtract(18, "years");
          }}
        />
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
          addonBefore={
            <Form.Item name="prefix" noStyle>
              +65
            </Form.Item>
          }
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item name="drugAllergies" label="Drug Allergies">
        <Select
          mode="tags"
          tokenSeparators={[","]}
          placeholder="Please input your drug allergies (if any)"
        >
          {drugAllergiesOptions}
        </Select>
      </Form.Item>

      <Form.Item name="healthConditions" label="Health Conditions">
        <Select
          mode="tags"
          tokenSeparators={[","]}
          placeholder="Please input your health conditions (if any)"
        >
          {healthConditionsOptions}
        </Select>
      </Form.Item>

      <p>About your baby</p>

      <Form.Item name="babyName" label="Baby's Name">
        <Input />
      </Form.Item>

      <Form.Item name="babyGender" label="Baby's Gender">
        <Select allowClear={true} placeholder="Select your baby's gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item name="dueDate" label="Expected Due Date">
        <DatePicker
          format={"D MMM YYYY"}
          allowClear={false}
          disabledDate={(current) => {
            return (
              current < moment().startOf("day") ||
              current > moment().startOf("day").add("9", "months")
            );
          }}
        />
      </Form.Item>

      {typeof errorMessage != "undefined" && (
        <p className="errorMessage">
          <WarningOutlined />
          &nbsp;{errorMessage}
        </p>
      )}

      <Form.Item {...tailFormItemLayout}>
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
      </Form.Item>
    </Form>
  );
}
