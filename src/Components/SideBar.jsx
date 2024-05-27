import React, { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import {
  BarsOutlined, UserOutlined, UploadOutlined, SettingOutlined, BarChartOutlined,
} from '@ant-design/icons';
import '@styles/Menu.css';

const {Title} = Typography;
const { Sider } = Layout;

// Data used by component.

const primary_color = '#0B6E4F';
const secondary_color = '#FA9F42';
// Sider Icons and Menu items

const items = [
  {
    key: 1,
    icon: <UserOutlined />,
    label: 'Dashboard',
  },
  {
    key: 2,
    icon: <BarChartOutlined />,
    label: 'Create New Bill',
  },
  {
    key: 3,
    icon: <UploadOutlined />,
    label: 'Upload Images',
  },
  {
    key: 4,
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

function SideBar() {
  const [collapse, setCollapse] = useState(false);

  const handleClick = () => {
    setCollapse(!collapse);
  };

  return (
    <Sider
      collapsed={collapse}
      collapsible
      width="320px"
      trigger={null}
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: primary_color,
      }}
    >

      <BarsOutlined
        onClick={handleClick}
        style={{
          float: 'right', color: 'white', fontSize: '28px', padding: '25px',
        }}
      />
      {!collapse ? <Title style={{color: "white", margin: "15px"}}>ABBS</Title> : null}

      

      <Menu theme="dark" mode="inline" style={{ backgroundColor: primary_color }} defaultSelectedKeys={['2']} items={items} />

    </Sider>
  );
}

export default SideBar;
