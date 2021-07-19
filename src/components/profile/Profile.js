import React from "react";
import { Layout, Row, Col } from "antd";
import PatientProfile from "./PatientProfile";
import ProfessionalProfile from "./ProfessionalProfile";
import ProfileImage from "./ProfileImage";

const patientProfile = {
  patientId: "PA0001",
  name: "Lee Ji Eun",
  email: "jieunlee@naver.co.kr",
  phone: "98765432",
  profileImage: "avatar.jpg",
  dob: "1995-12-09",
  address: "Coex Artium, Gangnam-gu, Seoul",
  postalCode: "57132",
  drugAllergies: null,
  healthConditions: null,
  dueDate: "2021-12-03",
  babyName: "Eve",
  babyGender: "Undetermined",
  professionalId: "PR0001",
};

const professionalProfile = {
  professionalId: "PR0001",
  type: "doctor",
  name: "Park Chan Yeol",
  email: "chanyeol@naver.co.kr",
  address: "Wall Street",
  postalCode: "123456",
  phone: "98765432",
  gender: "Male",
  profileImage: "avatar.jpg",
  education: "Seoul National University, Masters in Medicine",
  medicalLicenseNo: "L1485",
  clinicName: "SM Entertainment Clinic",
  clinicAddress: "SM Entertainment Building, Gangnam-gu, Seoul",
  clinicPostalCode: "123456",
};

const user = "DOCTOR"; // Change this for now to toggle between modes

var profile =
  user === "PATIENT"
    ? patientProfile
    : professionalProfile;

export default function Profile() {
  return (
    <Layout id="profile">
      <Row className="row" style={{ height: "100%" }}>
        <Col className="left">
          <p>Edit Profile</p>
          {user === "DOCTOR" && <ProfessionalProfile profile={profile} />}
          {user === "PATIENT" && <PatientProfile profile={profile} />}
        </Col>
        <Col className="right">
          <ProfileImage profile={profile} />
        </Col>
      </Row>
    </Layout>
  );
}
