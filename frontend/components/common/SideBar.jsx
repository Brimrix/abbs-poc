import React, { useEffect, useState, useContext, useReducer } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  BarsOutlined,
  UserOutlined,
  BarChartOutlined,
  LeftCircleOutlined,
  FundViewOutlined
} from "@ant-design/icons";

import "@styles/Menu.css";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Sider } = Layout;
import { billContext } from "@/context/BillContext";
import { useSideBar } from "@/context/SidebarProvider";

function SideBar() {
  const primary_color = "#0B6E4F";
  const secondary_color = "#FA9F42";

  const { state, dispatch } = useContext(billContext)
  const [collapse, setCollapse] = useState(state.utilities.collapsed);
  const { state: activeLink, dispatch: sidebarDispatch } = useSideBar()

  useEffect(() => {
    dispatch({ type: 'DISPATCH_COLLAPSE', payload: { collapse } });
  }, [collapse]);

  const handleClick = () => {
    setCollapse(!collapse);
  };

  const links = [
    {
      key: 'home',
      icon: <FundViewOutlined />,
      text: 'Dashboard',
      page: '/'
    }, {
      key: 'invoices',
      icon: <BarChartOutlined />,
      text: 'Invoices',
      page: '/invoices'
    }, {
      key: 'customers',
      icon: <UserOutlined />,
      text: 'Customers',
      page: '/customers'
    }
  ]

  const menuItems = links.map(link => ({
    ...link,
    label: <Link
      className="text-decoration-none"
      to={link.page}
      onClick={() => {
        dispatch({ type: "DISPATCH_SELECT_KEY", payload: { key: link.key } })
      }
      }
    >
      {link.text}
    </Link>
  }))

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
            style={{
              color: "white",
              fontSize: "28px",
              padding: "10px 0px"
            }}
          /> : <>
            <Title className="text-nowrap text-white mb-0">ABBS</Title>
            <LeftCircleOutlined
              onClick={handleClick}
              style={{
                float: 'right',
                color: "white",
                fontSize: "28px"
              }}
            />

          </>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: primary_color }}
        defaultSelectedKeys={[activeLink]}
        items={menuItems}
      />
    </Sider>
  );
}

export default SideBar;
