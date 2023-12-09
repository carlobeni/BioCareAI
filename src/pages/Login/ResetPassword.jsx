import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Input, Button, Form, Row, Col, Card, Layout } from "antd";
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Slide } from "react-awesome-reveal";
import { LogoContainer } from "../../components/Footer/styles";
import { SvgIcon } from "../../common/SvgIcon";

const { Content } = Layout;

export function ResetPassword() {
  const [email, setEmail] = useState("")
  const [firebaseError, setFirebaseError] = useState("")

  const [form] = Form.useForm();

  const { resetPassword,isLoading } = useAuth()

  const navigate = useNavigate()

  const handleChange = ({ target: { value } }) => {
    setEmail(value)
  };

  const onFinish = (values) => {
    console.log("Received values of form");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email)
    if (!email) return setFirebaseError("Please enter your email");
    try {
      await resetPassword(email)
      navigate("/login")
      setFirebaseError("Correo de recuperacion Enviado");
    } catch (error) {
      setFirebaseError(error.message)
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
    <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Slide direction="left">
        <Card style={{width: "90vmin", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
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
                placeholder="Email"
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
                   Aceptar
                  </Button>
                </Col>
                <Col span={24}>
                </Col>
              </Row>
            </Form.Item>
          </Form>
          <div>
              <label>
                <Link to="/login">Ya tengo una cuenta</Link>
              </label>
            </div>
          </Card>
        </Slide>
      </Content>
    </Layout>
  )
}
