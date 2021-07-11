import React from "react";
import {Layout, Tabs, Typography} from 'antd';
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import Ultrasound from "./Ultrasound";
import MedicalTest from "./MedicalTest";

const {TabPane} = Tabs;
const {Title} = Typography;

export default function RecordsMain() {
  return (
    <Layout style={{padding: '50px', minHeight: "100vh"}}>
      <Title level={4}>
        Click on a record category to view more information
      </Title>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Checkup/Consultation" key="1">
          <Consultation/>
        </TabPane>
        <TabPane tab="Health Record" key="2">
          <HealthRecord/>
        </TabPane>
        <TabPane tab="Ultrasound Scan" key="3">
          <Ultrasound/>
        </TabPane>
        <TabPane tab="Medical Test" key="4">
          <MedicalTest/>
        </TabPane>
      </Tabs>
    </Layout>
  );
};
