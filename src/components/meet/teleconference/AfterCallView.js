import React from "react";
import { Card } from "antd";
import { userContext } from "../../../userContext";
import { DOCTOR, PATIENT } from "../../../constants/constants";

export default function AfterCallView(props) {
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.type;

  return (
    <>
      <Card title="Appointment Ended" bordered={true}>
        {userType == PATIENT &&
          "Thank you for attending your appointment. Your doctor will be uploading your appointment details soon, which you can view in the health records tab."}
        {userType == DOCTOR &&
          "Meeting has ended. Please save the patient's appointment notes as soon as possible. This can be done through the 'Quick Notes' option below, or by adding a new record through the 'Records' tab."}
      </Card>
    </>
  );
}
