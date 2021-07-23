import React, { useState } from "react";
import { Layout, Row, Col, Switch } from "antd";
import { FormOutlined } from "@ant-design/icons";
import PatientRegister from "./PatientRegister";
import ProfessionalRegister from "./ProfessionalRegister";

export default function Profile() {
  const [showPatient, setShowPatient] = useState(true);

  return (
    <Layout id="profile">
      <Row className="row" style={{ height: "100%" }}>
        <Col className="left">
          <Row className="top">
            <div className="title">
              <FormOutlined />
              &nbsp;Register {showPatient ? "Patient" : "Medical Professional"}
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
        </Col>
      </Row>
    </Layout>
  );
}
