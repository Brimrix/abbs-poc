import React from 'react';
import '@styles/ImageUploaderStyle.css';
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
      <Content className='d-flex flex-column bg-white z-index-1 overflow-hidden'>
        <NavbarMain />
        <div className='flex-grow-1 px-4 pb-4 d-flex flex-column'>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
export default LayoutMain;
