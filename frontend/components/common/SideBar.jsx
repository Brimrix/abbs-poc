import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  BarsOutlined,
  UserOutlined,
  BarChartOutlined,
  LeftCircleOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage"

const { Sider } = Layout;


function SideBar() {
  const route = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useLocalStorage("collapse", false);

  const handleClick = () => {
    setCollapse(!collapse);
  };


  const menuItems = [
    {
      key: "/",
      icon: <FundViewOutlined />,
      label: "Dashboard",
    },
    {
      key: "/invoices",
      icon: <BarChartOutlined />,
      label: "Invoices",
    },
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: "Customers",
    },
  ];

  return (
    <Sider
      collapsible
      className="!bg-primary"
      collapsed={collapse}
      width="320px"
      trigger={null}
      style={{
        overflow: "auto",
        height: "100vh",
      }}
    >
      <div className="flex !text-white justify-between px-4 my-3">
        {collapse ? (
          <BarsOutlined
            onClick={handleClick}
            className="text-2xl mx-auto my-2"
          />
        ) : (
          <>
            <p className="inline text-4xl font-bold">ABBS</p>
            <LeftCircleOutlined
              onClick={handleClick}
              className="text-3xl"
            />
          </>
        )}
      </div>
      <Menu
        className="sider-menu !bg-primary"
        theme="dark"
        mode="inline"
        selectedKeys={[route.pathname]}
        items={menuItems}
        onClick={(props) => {
          navigate(props.key);
        }}
      />
    </Sider>
  );
}

export default SideBar;
