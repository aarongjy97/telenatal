import { Layout, Menu, Row, Col, Avatar } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

export default function Header() {
  const { Header } = Layout;
  let location = useLocation();
  const mappings = {
    "/": "1",
    "/meet": "2",
    "/records": "3",
    "/appointments": "4",
    "/profile": "5"
  };

  return (
    <Header className="header">
      <Row className="navbar">
      <Col className="logo">
        <img src="logo.png" alt="TeleNatal Logo" height="40px" />
        TeleNatal
      </Col>
      <Col className="buttons">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={mappings[location.pathname]}
        >
          <Menu.Item key="1">
            Overview
            <Link to="/"/>
          </Menu.Item>
          <Menu.Item key="2">
            Meet
            <Link to="/meet"/>
          </Menu.Item>
          <Menu.Item key="3">
            Records
            <Link to="/records"/>
          </Menu.Item>
          <Menu.Item key="4">
            Appointments
            <Link to="/appointments"/>
          </Menu.Item>
          <SubMenu key="SubMenu" icon={<Avatar size="medium" icon={<img src="avatar.jpg" alt="Profile" height="30px" style={{borderRadius:"50%"}} />} />}>
            <Menu.Item key="5">
              Profile
              <Link to="/profile"/>
            </Menu.Item>
            <Menu.Item key="">
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
      </Row>
    </Header>
  );
}
