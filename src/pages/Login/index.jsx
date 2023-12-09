import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Input, Button, Form, Row, Col, Card, Layout } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Slide } from "react-awesome-reveal";
import { LogoContainer } from "../../components/Footer/styles";
import { SvgIcon } from "../../common/SvgIcon";

const { Content } = Layout;

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [firebaseError, setFirebaseError] = useState("");
  const { isLoading, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const onFinish = (values) => {
    console.log("Received values");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Slide direction="right">
          <Card style={{ width: "90vmin", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Row justify="center" align="middle">
              <LogoContainer to="/" aria-label="homepage">
                <SvgIcon src="logo.svg" width="101px" height="64px" />
              </LogoContainer>
            </Row>
            {firebaseError && <Alert message={firebaseError} />}
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Por favor ingrese su email" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Row gutter={8} justify="center">
                  <Col span={24}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      onClick={handleSubmit}
                      block
                      style={{
                        background: "#52c41a",
                        borderColor: "#52c41a",
                        borderRadius: "8px",
                        margin: "4px 0",
                      }}
                    >
                      Iniciar
                    </Button>
                  </Col>
                  <Col span={24}>
                    <Button
                      type="primary"
                      danger ghost
                      icon={<GoogleOutlined />}
                      onClick={handleGoogleSignIn}
                      block
                      style={{
                        borderRadius: "8px",
                        margin: "4px 0",
                      }}
                    >
                      Continuar con Google
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
            <div>
              <label>
                <Link to="/register">Crear una cuenta</Link>
              </label>
            </div>
            <div>
              <label style={{ color: "violet" }}>
                <Link to="/resetpassword">Olvidaste tu Contraseña?</Link>
              </label>
            </div>
          </Card>
        </Slide>
      </Content>
    </Layout>
  );
}
