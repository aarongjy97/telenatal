import React, { useState } from "react";
import { Row, Button } from "antd";
import { countdownHours } from "./../../utils";

export default function BeforeCallView(props) {
  const [disableJoinCall, setDisableJoinCall] = useState(true);

  const onJoinCall = () => {
    props.onJoinCall();
  };

  if (countdownHours(props.appointment.date) <= 6) {
    setDisableJoinCall(false);
  }

  return (
    <div className="beforeCallView">
      <Row>
        {disableJoinCall && (
          <p>Please come back nearer to the appointment time!</p>
        )}
        {!disableJoinCall && (
          <p>Click to join call now!</p>
        )}
      </Row>
      <Row
        type="flex"
        style={{
          justifyContent: "center",
        }}
      >
        <Button disabled={disableJoinCall} type="primary" onClick={onJoinCall}>
          Join Call
        </Button>
      </Row>
    </div>
  );
}
