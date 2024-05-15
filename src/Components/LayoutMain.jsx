import React, { useState } from 'react';
import './Layout.css'
import {
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  FileOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import TableComponent from './Table';
import { Layout, Menu, theme, Input, DatePicker, Typography, Button, InputNumber, Space, Badge, Divider  } from 'antd';
import CardResult from './Card';
import SiderMain from './SiderMain';
import NavbarMain from './NavbarMain';
import ClientSearch from './ClientSearch';

const { Header, Content, Footer, Sider } = Layout;
const {Search} = Input;
const {Paragraph} = Typography;

const primary_color = "#0B6E4F";
const secondary_color = "#FA9F42";




const Layout_Grid = () => {
  

  const iconStyle = {float: "right", color: "white", fontSize: "30px", cursor: "pointer"};
 
  return (
    <Layout>

    <SiderMain />    
   
      <Layout>

      <NavbarMain />

        {/* The Second Header directly below the Main Header */}

      <ClientSearch />    
        
        {/* Content Is The Place for everything Tables etc */}

        <Content className='px-4 mt-3' style={{marginTop: "0px"}} >

        <TableComponent />   

        </Content>

         <div className='d-flex align-items-end justify-content-end p-4' style={{float: "right"}}>

        {/* The Card Component */}

        <CardResult />

        </div>     
      </Layout>
    </Layout>
  );
};
export default Layout_Grid;