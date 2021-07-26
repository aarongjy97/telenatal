import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import Fade from "react-reveal";
import { countdownHours } from "./../../utils";

export default function BeforeCallView(props) {
  const [disableJoinCall, setDisableJoinCall] = useState(false);

  const onJoinCall = () => {
    props.onJoinCall();
  };

  useEffect(() => {
    if (countdownHours(props.appointment) > 12) {
      setDisableJoinCall(true);
    }
  }, [props]);

  return (
    <Fade bottom>
      <div className="beforeCallView">
        <Row>
          {disableJoinCall && (
            <p>Please come back nearer to the appointment time!</p>
          )}
          {!disableJoinCall && <p>Click to join call now!</p>}
        </Row>
        <Row
          type="flex"
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            disabled={disableJoinCall}
            type="primary"
            onClick={onJoinCall}
          >
            Join Call
          </Button>
        </Row>
      </div>
    </Fade>
  );
}
