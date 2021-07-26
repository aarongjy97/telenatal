import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Row, Col, Avatar, Button } from "antd";
import { CalendarOutlined, HeartOutlined } from "@ant-design/icons";
import { userContext } from "../userContext";
import { PATIENT, PROFESSIONAL } from "../constants/constants";
import { getInitials, countdownDays, isDictEmpty } from "./utils";

export default function Header() {
  const { SubMenu } = Menu;
  const { Header } = Layout;
  let location = useLocation();
  const mappings = {
    "/appointments": "1",
    "/meet": "2",
    "/records": "3",
  };

  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const logoutUser = context.logoutUser;
  const loggedIn = isDictEmpty(user) ? false : true;
  const userType = user.userType;
  const logoUrl = loggedIn === false ? "/" : "/appointments";

  return (
    <Header id="header">
      <Row className="navbar">
        <Col className="logo">
          <a href={logoUrl}>
            <img src="logo.svg" alt="TeleNatal Logo" height="40px" />
            TeleNatal&nbsp;
            {loggedIn && userType === PATIENT && <span>Patient</span>}
            {loggedIn && userType === PROFESSIONAL && (
              <span>Medical Professional</span>
            )}
          </a>
        </Col>
        <Col className="buttons">
          {loggedIn === true && (
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={mappings[location.pathname]}
            >
              <Menu.Item key="1">
                Appointments
                <Link to="/appointments" />
              </Menu.Item>
              <Menu.Item key="2">
                Meet
                <Link to="/meet" />
              </Menu.Item>
              <Menu.Item key="3">
                Records
                <Link to="/records" />
              </Menu.Item>
              <SubMenu
                key="SubMenu"
                icon={
                  <>
                    <Avatar
                      style={{
                        color: "#fff0f6",
                        backgroundColor: "#780650",
                      }}
                    >
                      {getInitials(user.name)}
                    </Avatar>
                  </>
                }
              >
                <div style={{ margin: "2em 1em 0 1em", color: "#eb2f96" }}>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "large",
                    }}
                  >
                    {user.name}
                  </p>
                  <p>
                    {userType === PATIENT && "Patient"}
                    {userType === PROFESSIONAL &&
                      user.type === "doctor" &&
                      "Doctor"}
                    {userType === PROFESSIONAL &&
                      user.type === "nurse" &&
                      "Nurse"}
                  </p>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#ff85c0",
                    }}
                  >
                    {userType === PATIENT && user.dueDate !== undefined && (
                      <>
                        <CalendarOutlined />
                        &nbsp;D-{countdownDays(user.dueDate)}&nbsp;
                      </>
                    )}
                    {userType === PATIENT && user.babyName !== undefined && (
                      <>
                        <HeartOutlined />
                        &nbsp;{user.babyName}
                      </>
                    )}
                  </p>
                </div>
                <Menu.Item key="4" onClick={logoutUser}>
                  Logout
                  <Link to="/" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          )}
          {loggedIn === false && (
            <>
              <Button type="primary" href="/login">
                Login
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" href="/register">
                Register
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
}
