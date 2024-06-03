import React from 'react';
import '@styles/ImageUploaderStyle.css';

import {
  Layout
} from 'antd';

import SideBar from '@/components/common/SideBar';
import NavbarMain from '@/components/common/NavbarMain';
import { BillProvider } from '@/context/BillContext.jsx';

const {
  Header, Content, Footer, Sider,
} = Layout;

function LayoutMain({ FirstChild, SecondChild, ThirdChild }) {

  return (
    <BillProvider>
      <Layout>
        <div className='z-index-2'>
          <SideBar />
        </div>
        <Layout className='bg-white z-index-1'>
          <NavbarMain />

          {/* The Second Header directly below the Main Header */}
          {FirstChild}
          {/* Content Is The Place for everything Tables etc */}
          <Content className="px-3 mt-2">
            {SecondChild}
          </Content>

          <div className="d-flex align-items-end justify-content-end p-4 float-right" >
            {/* The Card Component */}
            {ThirdChild}
          </div>
        </Layout>
      </Layout>
    </BillProvider>

  );
}
export default LayoutMain;
