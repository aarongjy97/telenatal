import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Radio, InputNumber } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { registerProfessional } from "../../api/Auth";
import { getClinics, createClinic } from "../../api/Clinic";
import { educationList, formItemLayout, tailFormItemLayout } from "./constants";

export default function ProfessionalRegister() {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [clinics, setClinics] = useState([]);
  const [clinicsOption, setClinicsOption] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState({});
  const [disableClinicDetails, setDisableClinicDetails] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  // Fetch clinics
  useEffect(() => {
    getClinics()
      .then((result) => {
        setClinics(result.data);
        // Load clinic options
        let option = [];
        for (let index in result.data) {
          var clinicId = result.data[index].clinicId;
          var clinicName = result.data[index].clinicName;
          option.push({ value: clinicId, label: clinicName });
        }
        option.push({ value: "others", label: "Others" });
        setClinicsOption(option);
      })
      .catch((error) => console.log(error));
  }, []);

  const onRegistration = (values) => {
    // Create clinic if does not exist need
    var clinicId = null;
    if (Object.keys(selectedClinic).length === 0) {
      createClinic(
        values.clinicName,
        values.clinicAddress,
        values.clinicPostalCode
      )
        .then((result) => {
          console.log("Clinic Created");
          console.log(result);
          // TODO: Get clinic id, using dummy data first
          setSelectedClinic({
            clinicId: "a50fcb02-f362-4514-9c0d-551b60c21e8e",
            clinicName: "National University Hospital",
            clinicAddress: "5 Lower Kent Ridge Rd",
            clinicPostalCode: 119074,
          });
          clinicId = result.data.clinicId;
          setErrorMessage();
          window.location.replace("/login");
        })
        .catch((error) => setErrorMessage(error.response.data));
    } else {
      clinicId = selectedClinic.clinicId;
    }

    registerProfessional(
      values.name,
      values.password,
      values.email,
      values.phone,
      values.type,
      values.education,
      values.medicalLicenseNo,
      clinicId
    )
      .then((result) => {
        console.log("Professional Registered");
        console.log(result);
        // window.location.replace("/login");
      })
      .catch((error) => console.log(error));
  };

  const onSelectClinic = (clinicId) => {
    if (clinicId === "others") {
      setSelectedClinic({});
      setDisableClinicDetails(false);
    } else {
      clinics.forEach((clinic) => {
        if (Object.values(clinic).includes(clinicId)) {
          setSelectedClinic(clinic);
          setDisableClinicDetails(true);
        }
      });
    }
  };

  // Load education options
  var educationOption = [];
  for (let index in educationList) {
    let educationLevel = educationList[index];
    educationOption.push({ value: educationLevel, name: educationLevel });
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="professionalProfile"
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
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select your gender!",
          },
        ]}
      >
        <Select placeholder="Select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
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
          <Radio value={"doctor"}>Doctor</Radio>
          <Radio value={"nurse"}>Nurse</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="medicalLicenseNo"
        label="Medical License No."
        rules={[
          {
            required: true,
            message: "Please input your medical license!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="education"
        label="Highest Education"
        rules={[
          {
            required: true,
            message: "Please input your highest education!",
          },
        ]}
      >
        <Select
          placeholder="Select your highest education"
          options={educationOption}
        />
      </Form.Item>

      <p>About your clinic</p>

      <Form.Item
        name="clinicId"
        label="Clinic"
        rules={[
          {
            required: true,
            message: "Please select your clinic!",
          },
        ]}
      >
        <Select
          placeholder="Please select your clinic"
          options={clinicsOption}
          onChange={onSelectClinic}
        />
      </Form.Item>

      {disableClinicDetails === false && (
        <>
          <Form.Item
            name="clinicName"
            label="Clinic Name"
            rules={[
              {
                required: !disableClinicDetails,
                message: "Please input your clinic name!",
              },
            ]}
          >
            <Input disabled={disableClinicDetails} />
          </Form.Item>

          <Form.Item
            name="clinicAddress"
            label="Clinic Address"
            rules={[
              {
                required: !disableClinicDetails,
                message: "Please input your clinic address!",
              },
            ]}
          >
            <Input disabled={disableClinicDetails} />
          </Form.Item>

          <Form.Item
            name="clinicPostalCode"
            label="Clinic Postal Code"
            rules={[
              {
                required: !disableClinicDetails,
                message: "Please input your clinic postal code!",
              },
            ]}
          >
            <InputNumber
              min={100000}
              max={999999}
              disabled={disableClinicDetails}
            />
          </Form.Item>
        </>
      )}

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
