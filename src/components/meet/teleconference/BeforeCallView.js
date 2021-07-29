import React from "react";
import { Row, Button } from "antd";
import Fade from "react-reveal";

export default function BeforeCallView(props) {

  const onJoinCall = () => {
    props.onJoinCall();
  };

  return (
    <Fade bottom>
      <div className="beforeCallView">
        <Row>
          <p>Click to join call now!</p>
        </Row>
        <Row
          type="flex"
          style={{
            justifyContent: "center",
          }}
        >
          <Button
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
