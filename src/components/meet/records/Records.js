import React, { useState } from "react";
import { Layout, Row, Select } from "antd";
import { InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";
import Fade from "react-reveal";
import AppointmentDetails from "./AppointmentDetails";
import Consultation from "./Consultation";

export default function Records(props) {
  const { Option } = Select;

  const onRecordsSubmit = (values) => {
    console.log("received from form: " + JSON.stringify(values));
    // Save values to database
    var consultationRecord = {
      diagnosis: values.diagnosis,
      medication: values.medication,
      notes: values.notes,
    };
    props.onRecordsSubmit(consultationRecord);
  };

  const [selectedView, setSelectedView] = useState();

  return (
    <Layout id="appointmentDetails">
      <Row className="title">
        <InfoCircleOutlined />
        &nbsp; Appointment Details
      </Row>
      <Row className="toggle">
        <Select
          defaultValue="general"
          style={{ width: 210, textAlign: "center" }}
          onChange={(value) => setSelectedView(value)}
        >
          <Option value="general">General Details</Option>
          <Option value="consultation">
            <MessageOutlined />
            &nbsp;Add Consultation Notes
          </Option>
        </Select>
      </Row>
      <Fade bottom>
        <Row className="view">
          {(selectedView === "general" || selectedView === undefined) && (
            <Fade>
              <AppointmentDetails
                appointment={props.appointment}
                patient={props.patient}
              />
            </Fade>
          )}
          {selectedView === "consultation" && (
            <Consultation onRecordsSubmit={onRecordsSubmit} />
          )}
        </Row>
      </Fade>
    </Layout>
  );
}
