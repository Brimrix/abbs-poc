import React, {useState} from 'react';
import { Form, Input, Button } from 'antd';
import { PhoneOutlined, BarChartOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';


const SignUp = () => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };



  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[400px]">
        <h1 className="text-2xl font-bold mb-4">ABBS</h1>
        <Form name="signup" onFinish={onFinish} className="flex flex-col justify-center items-center">
          <Form.Item
            name="fullname"
            className='w-full'
            rules={[
                { required: true, message: 'Please input your username!' },
                { pattern: /^[a-zA-Z0-9]+$/, message: 'Username should only contain alphanumeric characters.' },
              ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter your Full Name" />
          </Form.Item>

          <Form.Item
          className='w-full'
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone" />
          </Form.Item>

          <Form.Item
          className='w-full'
            name="company"
            rules={[
              { required: true, message: 'Please input your company name!' },
            ]}
          >
            <Input prefix={<BarChartOutlined className="site-form-item-icon" />} placeholder="Company" />
          </Form.Item>

          <Form.Item
          className='w-full'
            name="email"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
          className='w-full'
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters.' },
              {
                validator: (_, value) => {
                  if (value && value.length >= 8) {
                    return {
                      pattern: /^(?=.*\d)(?=.*[!@#$%^&*])/,
                      message: 'Password must contain at least one numeric character and one special character.',
                    };
                  }
                  else {
                    return {
                        message: "Password must be 8 characters long"
                    }
                  }
                },
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <Form.Item
          className='w-full'
            name="password_confirmation"
            rules={[
              { required: true, message: 'Please input your password first !' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>



          {/* <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
          <button class="flex items-center ">
         <span>Continue with Google</span>
         </button>
         </div> */}

            <Button type="primary" htmlType="submit" className="btn-app-primary w-[200px]">
              Register
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default SignUp;
