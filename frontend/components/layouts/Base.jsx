import React from 'react';
import '@styles/ImageUploaderStyle.css';

import {
  Layout
} from 'antd';

import SideBar from '@/components/common/SideBar';
import NavbarMain from '@/components/common/NavbarMain';
import { BillProvider } from '@/context/BillContext.jsx';

function LayoutMain({ children }) {

  return (
    <BillProvider>
      <Layout>
        <div className='z-index-2'>
          <SideBar />
        </div>
        <Layout className='bg-white z-index-1'>
          <NavbarMain />
          {children}
        </Layout>
      </Layout>
    </BillProvider>

  );
}
export default LayoutMain;
