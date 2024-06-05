import React from 'react';
import '@styles/ImageUploaderStyle.css';

import {
  Layout
} from 'antd';

import SideBar from '@/components/common/SideBar';
import NavbarMain from '@/components/common/NavbarMain';
import { BillProvider } from '@/context/BillContext.jsx';

function LayoutMain({ children }) {
  const {  Content } = Layout
  return (
    <BillProvider>
      <Layout>
        <div className='z-index-2'>
          <SideBar />
        </div>
        <Content className='d-flex flex-column bg-white z-index-1 overflow-hidden'>
          <NavbarMain />
          <div className='flex-grow-1 px-4 pb-4 d-flex flex-column'>
            {children}
          </div>
        </Content>
      </Layout>
    </BillProvider>

  );
}
export default LayoutMain;
