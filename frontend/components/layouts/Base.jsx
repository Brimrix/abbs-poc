import React from 'react';
import '@styles/ImageUploaderStyle.css';

import {
  Layout
} from 'antd';


import CardResult from '@/components/invoice/Card';
import SideBar from '@/components/common/SideBar';
import NavbarMain from '@/components/common/NavbarMain';
import ClientSearch from '@/components/ClientSearch';

const {
  Header, Content, Footer, Sider,
} = Layout;

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
