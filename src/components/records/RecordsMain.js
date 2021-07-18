import React from "react";
import { Layout, Menu, Tabs, Input } from "antd";
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import Ultrasound from "./Ultrasound";
import MedicalTest from "./MedicalTest";
import { UserOutlined, MessageOutlined, DashboardOutlined, ScanOutlined, ExperimentOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { Search } = Input;
const userType = ["DOCTOR", "PATIENT"];

export default function RecordsMain() {
  const user = userType[0];
  const onSearch = (value) => console.log(value);

  return (
    <Layout id="records">
      {user === "DOCTOR" && (
        <Sider
          className="patientSider"
          width={250}
        >
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
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            theme="dark"
          >
            <Menu.Item icon={<UserOutlined />} key="1">
              Patient 1
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} key="2">
              Patient 2
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} key="3">
              Patient 3
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} key="4">
              Patient 4
            </Menu.Item>
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
            <Consultation userType={user} />
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
            <HealthRecord userType={user} />
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
