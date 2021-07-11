import React from "react";
import { Layout, Menu, Tabs } from "antd";
import Consultation from "./Consultation";
import HealthRecord from "./HealthRecord";
import Ultrasound from "./Ultrasound";
import MedicalTest from "./MedicalTest";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const userType = ["DOCTOR", "PATIENT"];

export default function RecordsMain() {
  const user = userType[0];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {user === "DOCTOR" && (
        <Sider
          className="site-layout-background"
          width={200}
          style={{ paddingTop: "20px" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
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
      <Content style={{ paddingTop: "20px" }}>
        <Tabs defaultActiveKey="1" style={{ paddingLeft: "20px" }}>
          <TabPane
            style={{
              marginTop: "-16px",
              paddingRight: "10px",
            }}
            tab="Checkup/Consultation"
            key="1"
          >
            <Consultation userType={user} />
          </TabPane>
          <TabPane
            style={{
              marginTop: "-16px",
              paddingRight: "10px",
            }}
            tab="Health Record"
            key="2"
          >
            <HealthRecord userType={user} />
          </TabPane>
          <TabPane
            style={{
              marginTop: "-16px",
              paddingRight: "10px",
            }}
            tab="Ultrasound Scan"
            key="3"
          >
            <Ultrasound userType={user} />
          </TabPane>
          <TabPane
            style={{
              marginTop: "-16px",
              paddingRight: "10px",
            }}
            tab="Medical Test"
            key="4"
          >
            <MedicalTest userType={user} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
