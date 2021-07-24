import React, { useContext } from "react";
import { Card } from "antd";
import { userContext } from "../../../userContext";
import { PROFESSIONAL, PATIENT } from "../../../constants/constants";

export default function AfterCallView(props) {
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  return (
    <>
      <Card title="Appointment Ended" bordered={true}>
        {userType == PATIENT &&
          "Thank you for attending your appointment. Your doctor will be uploading your appointment details soon, which you can view in the health records tab."}
        {userType == PROFESSIONAL &&
          "Meeting has ended. Please save the patient's appointment notes as soon as possible. This can be done through the 'Quick Notes' option below, or by adding a new record through the 'Records' tab."}
      </Card>
    </>
  );
}
