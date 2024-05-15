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

const { Header, Content, Footer, Sider } = Layout;
const {Search} = Input;
const {Paragraph} = Typography;

const primary_color = "#0B6E4F";
const secondary_color = "#FA9F42";




const Layout_Grid = () => {
  

  const iconStyle = {float: "right", color: "white", fontSize: "30px", cursor: "pointer"};
  const Secondary_Nav_Icon_style={color: "white", fontSize: "30px", backgroundColor: secondary_color, padding: "6px", borderRadius: "20%", cursor:"pointer", height: "30px", width: "30px"}
 
  return (
    <Layout>

    <SiderMain />
     
   
      <Layout>

      <NavbarMain />
        

        {/* The Second Header directly below the Main Header */}

        <Header className='bg-white d-flex align-items-center justify-content-between'>
      
       
       <div className=' d-flex justify-content-start align-items-center'>

{/* Above I am using the Bootstrap Classes */}

       <Input
          placeholder="Client"
          allowClear
          prefix={<UserOutlined style={{color: secondary_color}} />}
          style={{width: 300, margin: "10px"}}
         />

        <DatePicker suffixIcon={<CalendarOutlined style={{color: secondary_color, fontSize: "20px"}} />} />

       </div>
     
       <div className='d-flex align-items-center gap-1 me-5'>
          <MessageOutlined style={Secondary_Nav_Icon_style} />
          <DownloadOutlined style={Secondary_Nav_Icon_style} />
          <FileOutlined style={Secondary_Nav_Icon_style} />
          <PrinterOutlined style={Secondary_Nav_Icon_style} />

       </div>
        
      </Header>

      <div style={{marginLeft: "60px", marginRight: "90px"}}>
      <Divider style={{backgroundColor: '#DCDCDC', marginTop: 0, opacity: '45%'}} />
      </div>


     
        
        {/* Content Is The Place for everything Tables etc */}


        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            paddingLeft: "30px",
            paddingRight: "30px"

           
          }}
        >

          <div className='p-4'>

        <TableComponent />
      
          </div>

          <div style={{float: "right"}}>

            {/* The Card Component */}
        
          <CardResult />

          </div>
       


        
        
        </Content>
     
      </Layout>
    </Layout>
  );
};
export default Layout_Grid;