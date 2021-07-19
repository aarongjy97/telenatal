import React from "react";
import { Row, Col, Card } from "antd";

export default function AfterCallView(props) {
  return (
    <>
      <Card title="Appointment Ended" bordered={true}>
        Thank you for attending your appointment. Your doctor will be uploading
        your appointment details soon, which you can view in the health records
        tab.
        {/* ASH TODO meeting deets */}
      </Card>
    </>
  );
}
