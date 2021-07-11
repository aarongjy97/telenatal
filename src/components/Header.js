import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { Header } = Layout;
  let location = useLocation();
  const mappings = {
    "/": "1",
    "/meet": "2",
    "/records": "3",
    "/appointments": "4",
  };

  return (
    <Header style={{ minWidth: "100vh" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={mappings[location.pathname]}
      >
        <Menu.Item key="1">
          Overview
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2">
          Meet
          <Link to="/meet" />
        </Menu.Item>
        <Menu.Item key="3">
          Records
          <Link to="/records" />
        </Menu.Item>
        <Menu.Item key="4">
          Appointments
          <Link to="/appointments" />
        </Menu.Item>
      </Menu>
    </Header>
  );
}
