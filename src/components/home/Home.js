import React from "react";
import { Avatar, Layout, Row, Col } from "antd";

export default function Home() {
    return (
      <Layout id="home">
          <Row className="centerRow">
              <Col className="centerCol">
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
              </Col>
              <Col className="centerCol">
                <p>
                  The care that <br/>
                  <span>every mother deserves</span>
                </p>
              </Col>
          </Row>
      </Layout>
    );
  }
  