import React, { useEffect, useRef, useState, useContext } from "react";
import { Layout, Menu, theme, Typography } from "antd";
import {
  BarsOutlined,
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  BarChartOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";

import "@styles/Menu.css";
import Dashboard from "@/components/pages/Dashboard";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Sider } = Layout;
import { billContext } from "@/context/BillContext";

// Data used by component.

const primary_color = "#0B6E4F";
const secondary_color = "#FA9F42";
// Sider Icons and Menu items

function SideBar() {
  const [collapse, setCollapse] = useState(false);
  const { state, dispatch } = useContext(billContext);

  const handleClick = () => {
    setCollapse(!collapse);
  };

  const items = [
    {
      key: 1,
      icon: <UserOutlined />,
      label: (
        <Link
          to={"/dashboard"}
          onClick={() =>
            dispatch({ type: "DISPATCH_SELECT_KEY", payload: { key: "1" } })
          }
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: 2,
      icon: <BarChartOutlined />,
      label: (
        <Link
          to={"/"}
          onClick={() =>
            dispatch({ type: "DISPATCH_SELECT_KEY", payload: { key: "2" } })
          }
        >
          Create New Bill
        </Link>
      ),
    },
    {
      key: 3,
      icon: <UploadOutlined />,
      label: "Upload Images",
    },
    {
      key: 4,
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  return (
    <Sider
      collapsed={collapse}
      collapsible
      width="320px"
      trigger={null}
      style={{
        overflow: "auto",
        height: "100vh",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: primary_color,
      }}
    >
      {collapse ? (
        <BarsOutlined
          onClick={handleClick}
          style={{
            float: "right",
            color: "white",
            fontSize: "28px",
            padding: "25px",
          }}
        />
      ) : (
        <LeftCircleOutlined
          onClick={handleClick}
          style={{
            float: "right",
            color: "white",
            fontSize: "28px",
            padding: "25px",
          }}
        />
      )}

      {!collapse ? (
        <Title style={{ color: "white", margin: "15px" }}>ABBS</Title>
      ) : null}

      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: primary_color }}
        defaultSelectedKeys={[state.selectKey.selectedKey]}
        items={items}
      />
    </Sider>
  );
}

export default SideBar;
