import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "@/assets/styles/LoginStyle.css";
import { message, Form, Input, Button } from "antd";

const loginURL = import.meta.env.VITE_LOGIN_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("login", token, { path: "/" });

    if (success) {
      message.success("Successfully logged in");
      navigate("/");
    }

    console.log(token);
  }, [success]);

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const handleFormSubmit = async () => {
    const response = await fetch(loginURL, {
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

    if (!response.ok)
    message.error("Please check your email or password");

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setSuccess(response.ok);
    }


  };
  return (
    <Form
      name="login-form"
      onFinish={handleFormSubmit}
      className="vh-100 section-bg"
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong card-background">
              <div className="card-body p-5 text-start">
                <h3 className="mb-5">Login ABBS</h3>

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
                    className="form-control form-control-lg"
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
                    style={{display: "flex"}}
                    className="form-control form-control-lg"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                style={{marginLeft: "180px", height: "40px"}}
                  className="btn button-primary login-btn"
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Login;
