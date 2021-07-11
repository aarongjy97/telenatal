import React from "react";
import {Layout, Tabs} from 'antd';
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import Ultrasound from "./Ultrasound";
import MedicalTest from "./MedicalTest";

const {TabPane} = Tabs;

export default function RecordsMain() {
  const userType = ["DOCTOR", "PATIENT"];

  return (
    <Layout style={{padding: '50px', minHeight: "100vh"}}>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Checkup/Consultation" key="1">
          <Consultation userType={userType[0]} />
        </TabPane>
        <TabPane tab="Health Record" key="2">
          <HealthRecord />
        </TabPane>
        <TabPane tab="Ultrasound Scan" key="3">
          <Ultrasound />
        </TabPane>
        <TabPane tab="Medical Test" key="4">
          <MedicalTest />
        </TabPane>
      </Tabs>
    </Layout>
  );
}
