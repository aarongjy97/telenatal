import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Layout, Button, Row, Input, Form, Switch } from "antd";
import { LoginOutlined, WarningOutlined } from "@ant-design/icons";
import Fade from "react-reveal";
import { loginPatient, loginProfessional } from "./../../api/Auth";
import { userContext } from "./../../userContext";
import { isDictEmpty } from "./../utils";

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
  // Get user context and history
  const history = useHistory();
  const context = useContext(userContext);
  const user = context.user;
  const loginUser = context.loginUser;
  const loggedIn = isDictEmpty(user) ? false : true;

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
          history.push("/appointments");
        })
        .catch((error) => setErrorMessage(error.response.data));
    } else if (showPatient === false) {
      loginProfessional(values.email, values.password)
        .then((result) => {
          loginUser(result.data);
          setErrorMessage();
          history.push("/appointments");
        })
        .catch((error) => setErrorMessage(error.response.data));
    }
  };

  if (loggedIn) {
    return <Redirect to="/appointments" />;
  } else {
    return (
      <Layout id="login">
        <Fade bottom>
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

              {typeof errorMessage != "undefined" && (
                <p className="errorMessage">
                  <WarningOutlined />
                  &nbsp;{errorMessage}
                </p>
              )}

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
        </Fade>
      </Layout>
    );
  }
}
