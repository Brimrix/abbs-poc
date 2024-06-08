import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  BarsOutlined,
  UserOutlined,
  BarChartOutlined,
  LeftCircleOutlined,
  FundViewOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

// import "@styles/Menu.css";
const { Title } = Typography;
const { Sider } = Layout;

function SideBar() {
  // TODO: Define in a css theme instead.
  const primary_color = "#0B6E4F";
  const secondary_color = "#FA9F42";

  const route = useLocation()
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }
  const menuItems = [
    {
      key: '/',
      icon: <FundViewOutlined />,
      label: 'Dashboard',
    }, {
      key: '/invoices',
      icon: <BarChartOutlined />,
      label: 'Invoices',
    }, {
      key: '/customers',
      icon: <UserOutlined />,
      label: 'Customers',
    }
  ]

  return (
    <Sider
      collapsible
      collapsed={collapse}
      width="320px"
      trigger={null}
      style={{
        overflow: "auto",
        height: "100vh",
        backgroundColor: primary_color,
      }}
    >
      <div className="d-flex justify-content-between px-4 my-3">
        {collapse ?
          <BarsOutlined
            onClick={handleClick}
            className="text-white text-2xl py-2"
          /> : <>
            <Title className="text-nowrap text-white mb-0">ABBS</Title>
            <LeftCircleOutlined
              onClick={handleClick}
              className="float-right text-white text-3xl"
            />

          </>}
      </div>
      <Menu
      className="sider-menu"
        theme="dark"
        mode="inline"
        style={{ backgroundColor: primary_color }}
        selectedKeys={[route.pathname]}
        items={menuItems}
        onClick={(props) => {
          navigate(props.key)
        }}
      />
    </Sider>
  );
}

export default SideBar;
