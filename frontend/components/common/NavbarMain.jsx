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

const { Header } = Layout;
const { Search } = Input;

function NavbarMain() {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <div className="position-relative p-3 w-[250px] h-[200px]">
          <div className="d-flex align-items-center mb-3">
            <UserOutlined className="me-2" style={{ fontSize: "20px" }} />
            <Typography.Text>UserName</Typography.Text>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            className="position-absolute top-4 right-4"
          />
          <div className="flex justify-between items-center">
            <Button
              onClick={() => navigate("/login")}
              type="primary"
              icon={<LogoutOutlined />}
            >
              Logout
            </Button>
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

          <Suspense fallback={<h1>Loading.....</h1>}>
            <Avatar
            className="rounded-full w-[32px] h-[32px] cursor-pointer mt-[15px]"
              size="small"
              icon={<UserOutlined />}
            />
          </Suspense>

          <div className="d-flex flex-column">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <h5
              className="mt-[14px] mb-0 cursor-pointer font-bold"
              >
                John Doe
              </h5>
            </Dropdown>
            <h6 className="text-grey-400">Admin</h6>
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
