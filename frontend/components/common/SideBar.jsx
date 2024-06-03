import React, { useEffect, useState, useContext } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  BarsOutlined,
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  BarChartOutlined,
  LeftCircleOutlined,

} from "@ant-design/icons";

import "@styles/Menu.css";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Sider } = Layout;
import { billContext } from "@/context/BillContext";

const primary_color = "#0B6E4F";
const secondary_color = "#FA9F42";

function SideBar() {
  const { state, dispatch } = useContext(billContext)
  const [collapse, setCollapse] = useState(state.utilities.collapsed);

  useEffect(() => {
    dispatch({ type: 'DISPATCH_COLLAPSE', payload: { collapse } });
  }, [collapse]);

  const handleClick = () => {
    setCollapse(!collapse);
  };

  const items = [
    {
      key: 1,
      icon: <UserOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to={"/"}
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
          className="text-decoration-none"
          to={"/invoices"}
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
      icon: <UserOutlined />,
      label: (
        <Link
          className="text-decoration-none"
          to={"/customers"}
          onClick={() =>
            dispatch({ type: "DISPATCH_SELECT_KEY", payload: { key: "3" } })
          }
        >
          Customers
        </Link>
      ),
    },
    {
      key: 4,
      icon: <UploadOutlined />,
      label: "Upload Images",
    },

    {
      key: 5,
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

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
        defaultSelectedKeys={[state.utilities.selectedKey]}
        items={items}
      />
    </Sider>
  );
}

export default SideBar;
