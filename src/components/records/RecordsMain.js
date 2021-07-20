import React from "react";
import { Layout, Menu, Tabs, Input } from "antd";
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import Ultrasound from "./Ultrasound";
import MedicalTest from "./MedicalTest";
import {
  UserOutlined,
  MessageOutlined,
  DashboardOutlined,
  ScanOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import {
  getPatientAppointments,
  getProfessionalAppointments,
} from "./../../api/Appointment";
import { useState, useEffect } from "react";

const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { Search } = Input;
const userType = ["DOCTOR", "PATIENT"];

export default function RecordsMain() {
  const user = userType[0];
  const onSearch = (value) => console.log(value);

  const [patientRecords, setPatientRecords] = useState();

  // TODO: Replace with doctorId from context
  const doctorId = "carolinetan@nuhs.sg";
  const [allPatients, setAllPatients] = useState();
  useEffect(() => {
    getProfessionalAppointments(doctorId)
      .then((result) => {
        const allPatientsData = {};
        result.data.forEach((appt) => {
          if (allPatientsData?.[appt.patientId] != null) {
            allPatientsData[appt.patientId] = [
              ...allPatientsData[appt.patientId],
              appt,
            ];
          } else {
            allPatientsData[appt.patientId] = [appt];
          }
        });
        setAllPatients(allPatientsData);
        setPatientRecords(allPatientsData[Object.keys(allPatientsData)?.[0]]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout id="records">
      {user === "DOCTOR" && (
        <Sider className="patientSider" width={250}>
          <Search
            className="patientSearch"
            placeholder="Search for Patient"
            onSearch={onSearch}
            allowClear="true"
            enterButton
          />
          <Menu
            className="patientMenu"
            mode="inline"
            defaultSelectedKeys={["0"]}
            theme="dark"
            onClick={(keyListener) => {
              setPatientRecords(
                allPatients[Object.keys(allPatients)[keyListener.key]]
              );
            }}
          >
            {allPatients &&
              Object.keys(allPatients).map((patientEmail, index) => {
                return (
                  <Menu.Item icon={<UserOutlined />} key={index}>
                    {allPatients[patientEmail]?.[0]?.patientName ??
                      patientEmail}
                  </Menu.Item>
                );
              })}
          </Menu>
        </Sider>
      )}
      <Content className="recordContent">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <MessageOutlined />
                Consultation Record
              </span>
            }
            key="1"
          >
            <Consultation
              userType={user}
              patientRecords={patientRecords}
              consultationRecords={patientRecords?.flatMap((appt, _) => {
                if (appt?.consultationRecord == null) {
                  return [];
                }
                const consultationRecord = { ...appt?.consultationRecord };
                consultationRecord["date"] = appt?.date
                  ? new Date(appt?.date).toUTCString()
                  : null;
                return [consultationRecord];
              })}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DashboardOutlined />
                Health Record
              </span>
            }
            key="2"
          >
            <HealthRecord
              userType={user}
              patientRecords={patientRecords}
              healthRecords={patientRecords?.flatMap((appt) => {
                if (appt?.healthRecord == null) {
                  return [];
                }
                const healthRecord = { ...appt?.healthRecord };
                healthRecord["date"] = appt?.date
                  ? new Date(appt?.date).toUTCString()
                  : null;
                return [healthRecord];
              })}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <ScanOutlined />
                Ultrasound Scan Record
              </span>
            }
            key="3"
          >
            <Ultrasound userType={user} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <ExperimentOutlined />
                Medical Test Record
              </span>
            }
            key="4"
          >
            <MedicalTest userType={user} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
