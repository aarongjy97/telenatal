import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Avatar, Layout, Row, Col } from "antd";
import Fade from "react-reveal";
import { userContext } from "./../../userContext";

export default function Home() {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const loggedIn = Object.keys(user).length === 0 ? false : true;

  if (loggedIn) {
    return <Redirect to="/appointments" />;
  } else {
    return (
      <Layout id="home">
        <Row className="centerRow">
          <Col className="centerCol">
            <Fade left>
              <Avatar
                size={{
                  xs: 180,
                  sm: 220,
                  md: 280,
                  lg: 320,
                  xl: 400,
                  xxl: 480,
                }}
                src="mother.svg"
                shape="square"
                alt="Motherhood from FlatIcon"
              />
            </Fade>
          </Col>
          <Col className="centerCol">
            <Fade right>
              <p>
                The care that <br />
                <span>every mother deserves</span>
              </p>
            </Fade>
          </Col>
        </Row>
      </Layout>
    );
  }
}
