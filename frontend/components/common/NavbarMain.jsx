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
        <div
          className="position-relative p-3 w-[250px] h-[200px]"
        >
          <div className="d-flex align-items-center mb-3">
            <UserOutlined className="me-2" style={{ fontSize: "20px" }} />
            <Typography.Text>UserName</Typography.Text>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            className="position-absolute"
            style={{ top: "16px", right: "16px" }}
          />
          <div className="d-flex justify-content-between align-items-center">
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Search
          placeholder="Search"
          allowClear
          style={{ width: 300, margin: "10px", marginLeft: "320px" }}
        />

        <div
          style={{
            color: "black",
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Space>
            <QuestionCircleFilled
              style={{ fontSize: "20px", color: "#898989" }}
            />
            <Badge dot>
              <BellFilled
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#898989",
                }}
              />
            </Badge>
          </Space>

          <Suspense fallback={<h1>Loading.....</h1>}>
            <Avatar
              size="small"
              style={{
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                marginTop: "15px",
              }}
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
                style={{
                  marginTop: "12px",
                  marginBottom: "0px",
                  cursor: "pointer",
                }}
              >
                John Doe
              </h5>
            </Dropdown>
            <h6 style={{ color: "#898989" }}>Admin</h6>
          </div>
        </div>
      </Header>

      <Divider
        style={{
          backgroundColor: "#DCDCDC",
          marginTop: "0px",
          marginBottom: "0px",
          opacity: "45%",
        }}
      />
    </>
  );
}

export default NavbarMain;
