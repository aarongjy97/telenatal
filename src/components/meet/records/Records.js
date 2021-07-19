import React from "react";
import { Tabs, BackTop } from "antd";
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import AppointmentDetails from "./AppoinmentDetails";
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
const { TabPane } = Tabs;
export default function Records(props) {
  const onRecordsSubmit = (values) => {
    console.log("received from form: " + JSON.stringify(values));
    // save values to database
    props.onRecordsSubmit();
  };

  const [healthRecords, setHealthRecords] = React.useState([]);
  const [medicalTests, setMedicalTests] = React.useState([]);
  const [ultrasounds, setUltrasounds] = React.useState([]);

  React.useEffect(() => {
    // make call to fetch records of the given props.patient.patientId (or props.appoinment.patientId)
    // use dummy call first
    setTimeout(() => {
      setHealthRecords(dummyHealthRecords);
      setMedicalTests(dummyMedicalTests);
      setUltrasounds(dummyUltrasounds);
    }, 5000);
  }, []);

  return (
    <>
      <BackTop />
      <Tabs defaultActiveKey="1" style={{ paddingLeft: "20px" }}>
        <TabPane
          style={{
            marginTop: "-16px",
            paddingRight: "10px",
          }}
          tab="Appointment Details"
          key="1"
        >
          <AppointmentDetails
            appointment={props.appointment}
            patient={props.patient}
          />
        </TabPane>
        <TabPane
          style={{
            marginTop: "-16px",
            paddingRight: "10px",
          }}
          tab="Quick Notes"
          key="2"
        >
          <Consultation onRecordsSubmit={onRecordsSubmit} />
        </TabPane>
        <TabPane
          style={{
            marginTop: "-16px",
            paddingRight: "10px",
          }}
          tab="Health Records"
          key="3"
        >
          <HealthRecord healthRecords={healthRecords} />
        </TabPane>
        <TabPane
          style={{
            marginTop: "-16px",
            paddingRight: "10px",
          }}
          tab="Tests"
          key="4"
        >
          <MedicalTest medicalTests={medicalTests} />
        </TabPane>
        <TabPane
          style={{
            marginTop: "-16px",
            paddingRight: "10px",
          }}
          tab="Ultrasounds"
          key="5"
        >
          <Ultrasound ultrasounds={ultrasounds} />
        </TabPane>
      </Tabs>
    </>
  );
}
