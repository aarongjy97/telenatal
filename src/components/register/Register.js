import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Layout, Row, Col, Switch } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Fade from "react-reveal";
import PatientRegister from "./PatientRegister";
import ProfessionalRegister from "./ProfessionalRegister";
import { userContext } from "./../../userContext";
import { isDictEmpty } from "./../utils";

export default function Profile() {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const loggedIn = isDictEmpty(user) ? false : true;

  const [showPatient, setShowPatient] = useState(true);

  if (loggedIn) {
    return <Redirect to="/appointments" />;
  } else {
    return (
      <Layout id="profile">
        <Row className="row" style={{ height: "100%" }}>
          <Col className="left">
            <Fade bottom>
              <Row className="top">
                <div className="title">
                  <FormOutlined />
                  &nbsp;Register{" "}
                  {showPatient ? "Patient" : "Medical Professional"}
                </div>
                <div className="toggle">
                  <Switch
                    onClick={() => setShowPatient(!showPatient)}
                    defaultChecked
                  />
                </div>
              </Row>
              <Row className="bottom">
                {showPatient === true ? (
                  <PatientRegister />
                ) : (
                  <ProfessionalRegister />
                )}
              </Row>
            </Fade>
          </Col>
        </Row>
      </Layout>
    );
  }
}
