import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { message, Form, Input, Button } from "antd";
import { getCookieValue } from "@/utils";

import "@/assets/styles/LoginStyle.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();


  const handleFormSubmit = async () => {
    const url = `${import.meta.env.VITE_BASE_SERVER}login/`;
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookieValue("csrftoken"),
    };
    const body = JSON.stringify({ username, password });

    try {
      const response = await fetch(url, { method: "POST", headers, body });
      if (response.ok) {
        const { token } = await response.json();
        setCookie("accessToken", token);
        message.success("Successfully logged in");
        navigate("/");
      } else {
        const { non_field_errors } = await response.json();
        message.error(non_field_errors);
      }
    } catch (error) {
      message.error("An error occurred during login");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[30%]">
        <h1 className="text-center text-4xl font-bold mb-10">Welcome to ABBS</h1>
        <Form
          name="login-form"
          layout="vertical"
          onFinish={handleFormSubmit} >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
              {
                type: "email",
                message: "Please input a valid email",
              },
            ]}
          >
            <Input
              placeholder="Email"
              className="text-2xl"
              value={username}
              autoComplete="new-username"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              autoComplete="new-password"
              className="text-2xl"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-app-primary w-full text-2xl h-auto"
            >
              Login
            </Button>
            <p>
              Already got an account ?{" "}
              <Link to={'/signup'} className="text-secondary">
                Sign Up
              </Link>
            </p>
          </Form.Item>
        </Form>

      </div>
    </div>
  );
};

export default Login;
