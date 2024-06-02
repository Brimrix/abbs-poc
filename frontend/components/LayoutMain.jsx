import React from 'react';
import '@styles/ImageUploaderStyle.css';

import {
  Layout, Menu, theme, Input, DatePicker, Typography, Button, InputNumber, Space, Badge, Divider,
} from 'antd';

import Table from '@/components/Table';
import CardResult from '@/components/Card';
import SideBar from '@/components/SideBar';
import NavbarMain from '@/components/NavbarMain';
import ClientSearch from '@/components/ClientSearch';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { Search } = Input;
const { Paragraph } = Typography;

const primary_color = '#0B6E4F';
const secondary_color = '#FA9F42';

function LayoutMain({ children }) {
  const iconStyle = {
    float: 'right', color: 'white', fontSize: '30px', cursor: 'pointer',
  };

  return (
    <Layout>
      <SideBar />
      <Layout style={{ backgroundColor: 'white' }}>
        <NavbarMain />

        {/* The Second Header directly below the Main Header */}
        <ClientSearch />

        {/* Content Is The Place for everything Tables etc */}
        <Content className="px-3 mt-2" style={{ marginTop: '0px', backgroundColor: 'white' }}>
          {children}
        </Content>

        <div className="d-flex align-items-end justify-content-end p-4" style={{ float: 'right', backgroundColor: 'white' }}>
          {/* The Card Component */}
          <CardResult />
        </div>
      </Layout>
    </Layout>
  );
}
export default LayoutMain;
