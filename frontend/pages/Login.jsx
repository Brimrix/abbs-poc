import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { message, Form, Input, Button } from "antd";
import "@/assets/styles/LoginStyle.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookie] = useCookies()
  const navigate = useNavigate();

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const handleFormSubmit = async () => {
    const response = await fetch(import.meta.env.VITE_BASE_SERVER + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookieValue("csrftoken"),
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok)
      message.error("Please check your email or password");

    if (response.ok) {
      setCookie('accessToken', data.token)
      navigate('/')
    }


  };
  return (
    <div className="!bg-primary min-h-dvh flex flex-col justify-center">
      <div className="bg-white min-h-max w-2/5 mx-auto rounded-md p-5">
        <Form
          name="login-form"
          onFinish={handleFormSubmit}
        >
          <div className="text-center">
            <p className="text-3xl mb-10">Welcome to ABBS</p>

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
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
                className="text-3xl"
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
                className="text-2xl"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </Form.Item>

            <Form.Item className="">
              <Button
                type="primary"
                htmlType="submit"
                className="mt-10 btn-app-primary w-full min-h-12 text-3xl"
              >
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
