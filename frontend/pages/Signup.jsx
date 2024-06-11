import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import {
  PhoneOutlined,
  BarChartOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined
} from "@ant-design/icons";

const SignUp = () => {

   const [form, setForm] = useState({});



  const onFinish = (values) => {
    setForm(values);
    alert(JSON.stringify(values));
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

          <Form.Item
            name="username"
            className="w-full"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <div className="w-full flex justify-between gap-2">
          <Form.Item
            name="firstname"
            className="w-1/2"
            rules={[
              { required: true, message: "Please input your first name!" },
              { min: 2, message: "Enter your first name" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your First Name"
            />
          </Form.Item>

          <Form.Item
            name="lastname"
            className="w-1/2"
            rules={[
              { required: true, message: "Please input your last name!" },
              { min: 2, message: "Enter your last name" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your Last Name"
            />
          </Form.Item>
          </div>

          <Form.Item
            className="w-full"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^\d+$/,
                message: "Phone number can only contain numbers",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>

          <Form.Item
            className="w-full"
            name="company"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input
              prefix={<BarChartOutlined className="site-form-item-icon" />}
              placeholder="Company"
            />
          </Form.Item>


          <Form.Item
            className="w-full"
            name="address"
            rules={[
              { required: true, message: "Please input your address!" },
            ]}
          >
            <Input
              prefix={<BarChartOutlined className="site-form-item-icon" />}
              placeholder="Address"
            />
          </Form.Item>



          <Form.Item
            className="w-full"
            name="email"
            rules={[
              { type: "email", message: "The input is not valid email!" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
                    return Promise.reject("Please input your password !");
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
      </div>
    </div>
  );
};

export default SignUp;
