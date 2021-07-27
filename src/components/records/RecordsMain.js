import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Tabs } from "antd";
import Fade from "react-reveal";
import {
  UserOutlined,
  MessageOutlined,
  DashboardOutlined,
  ScanOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import Ultrasound from "./Ultrasound";
import MedicalTest from "./MedicalTest";
import {
  getPatientAppointments,
  getProfessionalAppointments,
} from "./../../api/Appointment";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { userContext } from "./../../userContext";

const { TabPane } = Tabs;
const { Content, Sider } = Layout;

export default function RecordsMain() {
  const history = useHistory();
  const activeTab = () => {
    const tab = history.location?.state?.tab;
    if (tab === "health") {
      return "2";
    } else if (tab === "ultrasound") {
      return "3";
    } else if (tab === "test") {
      return "4";
    }
    return "1";
  };

  const context = useContext(userContext);
  const user = context.user;
  const userType = user.medicalLicenseNo ? PROFESSIONAL : PATIENT;

  const [patientRecords, setPatientRecords] = useState();

  const email = user.email;
  const [allPatients, setAllPatients] = useState();
  useEffect(() => {
    if (userType === PROFESSIONAL) {
      getProfessionalAppointments(email)
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
    } else if (userType === PATIENT) {
      getPatientAppointments(email)
        .then((result) => {
          setPatientRecords(result.data);
          console.log(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [userType, email]);

  return (
    <Layout id="records">
      {userType === PROFESSIONAL && (
        <Sider className="patientSider" width={250} collapsible={true}>
          <h1>Patients</h1>
          <Fade bottom>
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
          </Fade>
        </Sider>
      )}
      <Content className="recordContent">
        <Tabs defaultActiveKey={activeTab()}>
          <TabPane
            tab={
              <>
                <MessageOutlined />
                Consultation Record
              </>
            }
            key="1"
          >
            <Consultation
              userType={userType}
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
              <>
                <DashboardOutlined />
                Health Record
              </>
            }
            key="2"
          >
            <HealthRecord
              userType={userType}
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
              <>
                <ScanOutlined />
                Ultrasound Scan Record
              </>
            }
            key="3"
          >
            <Ultrasound userType={userType} patientRecords={patientRecords} />
          </TabPane>
          <TabPane
            tab={
              <>
                <ExperimentOutlined />
                Medical Test Record
              </>
            }
            key="4"
          >
            <MedicalTest
              userType={userType}
              testRecords={patientRecords?.flatMap((appt) => {
                if (appt?.testRecord == null) {
                  return [];
                }
                const testRecord = { ...appt?.testRecord };
                testRecord["date"] = appt?.date
                  ? new Date(appt?.date).toUTCString()
                  : null;
                return [testRecord];
              })}
              patientRecords={patientRecords}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
