import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Layout
} from 'antd';

import SideBar from '@/components/common/SideBar';
import NavbarMain from '@/components/common/NavbarMain';

function LayoutMain({ children }) {
  const { Content } = Layout
  return (
    <Layout>
      <SideBar />
      <Content className='flex flex-col bg-white z-index-1 overflow-hidden'>
        <NavbarMain />
        <div className='grow px-4 pb-4 flex flex-col'>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
export default LayoutMain;
