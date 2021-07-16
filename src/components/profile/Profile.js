import React, { useState } from "react";
import { Layout, Upload, Button, message, Avatar, Row, Col } from "antd";
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import PatientProfile from "./PatientProfile";
import ProfessionalProfile from "./ProfessionalProfile";

const patientProfile = {
  "patientId": "PA0001",
  "name": "Lee Ji Eun",
  "email": "jieunlee@naver.co.kr",
  "phone": "98765432",
  "profileImage": "avatar.jpg",
  "dob": "1995-12-09",
  "address": "Coex Artium, Gangnam-gu, Seoul",
  "postalCode": "57132",
  "drugAllergies": null,
  "healthConditions": null,
  "dueDate": "2021-12-03",
  "babyName": "Eve",
  "babyGender": "Undetermined",
  "professionalId": "PR0001"
};

const professionalProfile = {
  "professionalId": "PR0001",
  "type": "doctor",
  "name": "Park Chan Yeol",
  "email": "chanyeol@naver.co.kr",
  "address": "Wall Street",
  "postalCode": "123456",
  "phone": "98765432",
  "gender": "Male",
  "profileImage": "avatar.jpg",
  "education": "Seoul National University, Masters in Medicine",
  "medicalLicenseNo": "L1485",
  "clinicName": "SM Entertainment Clinic",
  "clinicAddress": "SM Entertainment Building, Gangnam-gu, Seoul",
  "clinicPostalCode": "123456"
};

const user = "DOCTOR"; // Change this for now to toggle between modes

var profile = ((user === "PATIENT") ? patientProfile: (user === "DOCTOR") ? professionalProfile : "ERROR!");

const Uploader = () => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!');
    }
    return isJpgOrPng && isLt1M;
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Upload Profile Image to DB

    // Pull and refresh
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  return (
    <ImgCrop grid>
      <Upload
        fileList={fileList}
        accept={"image/jpeg,image/png"}
        beforeUpload= {beforeUpload}
        onChange={onChange}
        onPreview={onPreview}
        showUploadList={false}>
        <Button icon={<UploadOutlined />}>Update Profile Image</Button>
      </Upload>
    </ImgCrop>
  );
};

export default function Profile() {

  return (
    <Layout id="profile">
      <Row style={{ height:"100%" }}>
        <Col className="profile-left" span={14}>
          {user === "DOCTOR" && (
            <ProfessionalProfile 
              profile={profile} />
          )}
          {user === "PATIENT" && (
            <PatientProfile
              profile={profile} />
          )}
        </Col>
        <Col className="profile-right" span={6}>
          <div className="profile-image">
            <Avatar
              size={{
                xs: 48,
                sm: 64,
                md: 84,
                lg: 120,
                xl: 180,
                xxl: 220,
              }}
              src={profile.profileImage} alt="Profile" />
          </div>
          <div className="profile-button">
            <Uploader />
          </div>
        </Col>
        <Col span={4}>
        </Col>
      </Row>
    </Layout>
  );
}
