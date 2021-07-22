import React, { useContext } from "react";
import { Layout, Menu, Row, Col, Avatar, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../userContext";

export default function Header() {
  const { SubMenu } = Menu;
  const { Header } = Layout;
  let location = useLocation();
  const mappings = {
    "/appointments": "1",
    "/meet": "2",
    "/records": "3",
    "/profile": "4",
  };

  // Get user context
  const context = useContext(userContext);
  // const user = context.user;
  const loggedIn = context.loggedIn;
  const logoutUser = context.logoutUser;

  var logoUrl = loggedIn === false ? "/" : "/appointments";

  return (
    <Header id="header">
      <Row className="navbar">
        <Col className="logo">
          <a href={logoUrl}>
            <img src="logo.svg" alt="TeleNatal Logo" height="40px" />
            TeleNatal
          </a>
        </Col>
        <Col className="buttons">
          {loggedIn === true && (
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={mappings[location.pathname]}
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
                  <Avatar
                    size="medium"
                    icon={
                      <img
                        src="avatar.jpg" // TODO: change to user profile pic
                        alt="Profile"
                        height="30px"
                        style={{ borderRadius: "50%" }}
                      />
                    }
                  />
                }
              >
                <Menu.Item key="4">
                  Profile
                  <Link to="/profile" />
                </Menu.Item>
                <Menu.Item key="5" onClick={logoutUser}>
                  Logout
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
