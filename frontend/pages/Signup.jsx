import { Form, Input, Button, message } from "antd";
import {
  LockOutlined,
  HomeOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import { getCookieValue } from "@/utils";

const SignUp = () => {
  const navigate = useNavigate();


  const onFinish = async (values) => {
    const {
      company,
      address,
      username,
      firstname,
      lastname,
      phone,
      password,
      password_confirmation,
    } = values;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_SERVER}api/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookieValue("csrftoken"),

        },

        body: JSON.stringify({
          company,
          address,
          username,
          first_name: firstname,
          last_name: lastname,
          phone,
          password,
          confirm_password: password_confirmation,
        }),
      });

      if (response.status === 201) {
        message.success("Account created successfully");
        navigate("/login");
      } else {
        const { non_field_errors } = await response.json();
        message.error("non_field_errors");
      }
    }

    catch (error) {
      message.error("An error in Signup");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[40%]">
        <h1 className="text-2xl font-bold mb-4">ABBS</h1>
        <Form
          name="signup"
          onFinish={onFinish}
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full flex justify-between gap-2">
            <Form.Item
              name="firstname"
              className="w-1/2"
              rules={[
                { required: true, message: "Please input your first name!" },
                { min: 2, message: "Enter your first name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item name="lastname" className="w-1/2">
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          <Form.Item
            className="w-full"
            name="username"
            rules={[
              {
                type: "email",
                message:
                  "Enter valid email that you want to use for password reset!",
              },
              {
                required: true,
                message:
                  "Please enter the email that you want to use for password reset!",
              },
            ]}
          >
            <Input
              autoComplete="new-username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="phone"
            rules={[{ min: 6, message: "Please input your phone number!" }]}
          >
            <PhoneInput inputStyle={{ width: "100%" }} country={"pk"} />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="company"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input
              prefix={<GlobalOutlined className="site-form-item-icon" />}
              placeholder="Company"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              prefix={<HomeOutlined className="site-form-item-icon" />}
              placeholder="Address"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            required={true}
            name="password"
            rules={[
              () => ({
                validator(_, value) {
                  if (value.length === 0) {
                    return Promise.reject("Please input your password!");
                  } else if (value.length < 6) {
                    return Promise.reject(
                      "The Password should be more than 6 characters"
                    );
                  } else {
                    let pattern = /^(?=.*\d)(?=.*[!@#$%^&*])/;
                    if (pattern.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "Add numeric and special character in your password."
                      );
                    }
                  }
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="new-password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            required={true}
            name="password_confirmation"
            className="w-full"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length === 0) {
                    return Promise.reject("Please confirm your password !");
                  } else {
                    const password = getFieldValue("password");
                    return password === value
                      ? Promise.resolve()
                      : Promise.reject("Passwords don't match");
                  }
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-app-primary w-[200px]"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <span>
          Already have an account,{" "}
          <Link to={"/login"} className="text-secondary">
            Login
          </Link>{" "}
          instead.
        </span>
      </div>
    </div>
  );
};

export default SignUp;
