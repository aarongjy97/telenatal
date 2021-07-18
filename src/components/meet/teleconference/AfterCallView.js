import React from "react";
import { Row, Col, Card } from "antd";

export default function AfterCallView(props) {
  return (
<<<<<<< Updated upstream
    <Row>
      <Col>
        <Card title="Appointment Ended" bordered={true}>
          Thank you for attending your appointment Your doctor will be uploading
          your appointment details soon, which you can view in the health
          records tab.
          {/* ASH TODO meeting deets */}
        </Card>
      </Col>
    </Row>
=======
    <>
      <Card title="Appointment Ended" bordered={true}>
        Thank you for attending your appointment Your doctor will be uploading
        your appointment details soon, which you can view in the health records
        tab.
        {/* ASH TODO meeting deets */}
      </Card>
    </>
>>>>>>> Stashed changes
  );
}
