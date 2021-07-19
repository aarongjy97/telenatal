import React from "react";
import { Layout, Row, Col } from "antd";
import PatientProfile from "../profile/PatientProfile";
import ProfessionalProfile from "../profile/ProfessionalProfile";
import ProfileImage from "../profile/ProfileImage";

const user = "DOCTOR"; // Change this for now to toggle between modes

export default function Profile() {
  return (
    <Layout id="profile">
      <Row className="row" style={{ height: "100%" }}>
        <Col className="left">
          <p>Register</p>
          {user === "DOCTOR" && <ProfessionalProfile />}
          {user === "PATIENT" && <PatientProfile />}
        </Col>
        <Col className="right">
          <ProfileImage />
        </Col>
      </Row>
    </Layout>
  );
}
