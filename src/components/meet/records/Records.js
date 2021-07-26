import React, { useEffect, useState } from "react";
import { Layout, Row, Select } from "antd";
import {
  InfoCircleOutlined,
  MessageOutlined,
  DashboardOutlined,
  ScanOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import Fade from "react-reveal";
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import AppointmentDetails from "./AppointmentDetails";
import MedicalTest from "./MedicalTest";
import Ultrasound from "./Ultrasound";

const dummyHealthRecords = [
  {
    time: "6 Jul 2021, 6.30pm",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "5 Jul 2021, 4.30pm",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "21 Jun 2021, 8.00am",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "22 Jun 2021, 8.00am",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "23 Jun 2021, 8.00am",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
  {
    time: "24 Jun 2021, 8.00am",
    weight: 58,
    wm: 42,
    hr: 72,
    bp: "120/88",
    notes: "Feeling more fatigue in the past few days",
  },
];

const dummyMedicalTests = [
  {
    time: "6 Jul 2021, 6.30pm",
    testName: "Urine Test",
    notes: "Results are positive and normal",
  },
  {
    time: "6 Jul 2021, 6.30pm",
    testName: "Urine Test",
    notes: "Results are positive and normal",
  },
  {
    time: "6 Jul 2021, 6.30pm",
    testName: "Urine Test",
    notes: "Results are positive and normal",
  },
];

const dummyUltrasounds = [
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

export default function Records(props) {
  const { Option } = Select;

  const onRecordsSubmit = (values) => {
    console.log("received from form: " + JSON.stringify(values));
    // save values to database
    props.onRecordsSubmit();
  };

  const [selectedView, setSelectedView] = useState();
  const [healthRecords, setHealthRecords] = useState([]);
  const [medicalTests, setMedicalTests] = useState([]);
  const [ultrasounds, setUltrasounds] = useState([]);

  useEffect(() => {
    // make call to fetch records of the given props.patient.patientId (or props.appoinment.patientId)
    // use dummy call first
    setTimeout(() => {
      setHealthRecords(dummyHealthRecords);
      setMedicalTests(dummyMedicalTests);
      setUltrasounds(dummyUltrasounds);
    }, 5000);
  }, []);

  return (
    <Layout id="appointmentDetails">
      <Row className="title">
        <InfoCircleOutlined />
        &nbsp; Appointment Details
      </Row>
      <Row className="toggle">
        <p>View</p>&nbsp;&nbsp;&nbsp;
        <Select
          defaultValue="general"
          style={{ width: 210, textAlign:"center"}}
          onChange={(value) => setSelectedView(value)}
        >
          <Option value="general">General Details</Option>
          <Option value="consultation">
            <MessageOutlined />
            &nbsp;Consultation Record
          </Option>
          <Option value="health">
            <DashboardOutlined />
            &nbsp;Health Record
          </Option>
          <Option value="ultrasound">
            <ScanOutlined />
            &nbsp;Ultrasound Scan Record
          </Option>
          <Option value="test">
            <ExperimentOutlined />
            &nbsp;Medical Test Record
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
            <Fade>
              <Consultation onRecordsSubmit={onRecordsSubmit} />
            </Fade>
          )}

          {selectedView === "health" && (
            <Fade>
              <HealthRecord healthRecords={healthRecords} />
            </Fade>
          )}
          {selectedView === "ultrasound" && (
            <Fade>
              <Ultrasound ultrasounds={ultrasounds} />
            </Fade>
          )}
          {selectedView === "test" && (
            <Fade>
              <MedicalTest medicalTests={medicalTests} />
            </Fade>
          )}
        </Row>
      </Fade>
    </Layout>
  );
}
