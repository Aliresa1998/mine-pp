import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Input, Form, Typography, notification, message } from "antd";
import "antd/dist/reset.css";
import "./Login.css"; // Include CSS for styling
import { controller } from "../assets/controller/controller";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    setLoading(true);
    var payload = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await controller.signIn(payload);
console.log(response)
      if (response.status < 250) {
        // Simulate a successful login
        localStorage.setItem(
          "user",
          "123"
        );
        notification.success({
          message: "ورود موفق",
          description: "شما با موفقیت وارد شدید",
          placement: "topRight",
        });
        window.location.href = "/dashboard";
      } else {
        // Simulate an error
        message.error("نام کاربری یا رمز عبور اشتباه است", 3);
      }
    } catch (e) {
      message.error("خطا در برقراری ارتباط با سرور!", 3);
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <Title level={3} className="login-title">
            ورود به حساب کاربری
          </Title>
          <Form
            name="login"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "لطفا نام کاربری خود را وارد کنید" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="نام کاربری"
                size="large"
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "لطفا رمز عبور خود را وارد کنید" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="رمز عبور"
                size="large"
                allowClear
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
                loading={loading}
                block
              >
                ورود
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
