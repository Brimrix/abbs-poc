import React, { Suspense } from "react";
import {
  Layout,
  Input,
  Space,
  Badge,
  Divider,
  Avatar,
  Dropdown,
  Button,
  Typography,
} from "antd";
import {
  QuestionCircleFilled,
  BellFilled,
  UserOutlined,
  CloseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const { Header } = Layout;
const { Search } = Input;

function NavbarMain() {
  const navigate = useNavigate();
  const [_, setCookie] = useCookies()

  const items = [
    {
      key: "1",
      label: (
        <div className="position-relative p-1 w-[250px]">
          <div className="flex justify-between items-center"
            onClick={() => {
              setCookie('accessToken', null)
              navigate("/login")
            }}>
            Logout <LogoutOutlined />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header
        className="bg-white flex items-center justify-between"
      >
        <Search
          placeholder="Search"
          allowClear
          className="w-[300px] m-[10px] ml-[320px]"
        />

        <div
          className="flex gap-[10px] mt-[10px]"

        >
          <Space>
            <QuestionCircleFilled
              className="text-xl text-gray-500"
            />
            <Badge dot>
              <BellFilled
                className="text-xl text-gray-500"
              />
            </Badge>
          </Space>

          <div className="self-align-middle">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <span className="flex gap-2">
                <span className="flex flex-col">
                  <p
                    className="cursor-pointer font-bold"
                  >
                    John Doe
                  </p>
                </span>
                <UserOutlined />
              </span>
            </Dropdown>
          </div>
        </div>
      </Header>

      <Divider
        className="bg-gray-400 mt-0 mb-0 opacity-45"
      />
    </>
  );
}

export default NavbarMain;
