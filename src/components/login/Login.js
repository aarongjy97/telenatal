import React, { useState, useContext } from "react";
import { Layout, Button, Row, Col, Input, Form, Switch } from "antd";
import { LoginOutlined, WarningOutlined } from "@ant-design/icons";
import { loginPatient, loginProfessional } from "../../api/Auth";
import { userContext } from "../../userContext";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 6,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 12,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Login() {
  // Get user context
  const context = useContext(userContext);
  const loginUser = context.loginUser;

  // Set states
  const [showPatient, setShowPatient] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  // Login for professional/patient
  const onFinish = (values) => {
    if (showPatient === true) {
      loginPatient(values.email, values.password)
        .then((result) => {
          loginUser(result.data);
          setErrorMessage();
          window.location.replace("/appointments");
        })
        .catch((error) => setErrorMessage(error.response.data));
    } else if (showPatient === false) {
      loginProfessional(values.email, values.password)
        .then((result) => {
          loginUser(result.data);
          setErrorMessage();
          window.location.replace("/appointments");
        })
        .catch((error) => setErrorMessage(error.response.data));
    }
  };

  return (
    <Layout id="login">
      <Row className="row">
        <Col className="col" span={10}>
          <Row className="top">
            <div className="title">
              <LoginOutlined />
              &nbsp;Login {showPatient ? "Patient" : "Medical Professional"}
            </div>
            <div className="toggle">
              <Switch
                onClick={() => setShowPatient(!showPatient)}
                defaultChecked
              />
            </div>
          </Row>
          <Row className="bottom">
            <Form {...formItemLayout} name="loginForm" onFinish={onFinish}>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {typeof errorMessage != "undefined" && 
                <p className="errorMessage">
                  <WarningOutlined />
                  &nbsp;{errorMessage}
                </p>
              }

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="default" href="/">
                  Back to Home
                </Button>
                <Button type="link" href="/register">
                  New here? Register
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
