import React, { useState } from 'react';
import './Layout.css'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  QuestionCircleFilled,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  FileOutlined,
  MessageOutlined,
  BellFilled
} from '@ant-design/icons';
import TableComponent from './Table';
import { Layout, Menu, theme, Input, DatePicker, Typography, Button, InputNumber, Space, Badge  } from 'antd';
import CardResult from './Card';
import Sider_main from './Sider_main';
import admin from '../assets/admin.png';


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

    <Sider_main />
     
   
      <Layout>

      
        {/* Header is the place directly connected with the Sider */}
        <Header style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor:'white'}}>
        


      

        <Search
          placeholder="Search"
          allowClear
          style={{width: 300, margin: "10px", marginLeft: "320px"}}
         />


       
        

        <div style={{color: "black", display: "flex", gap:"10px", marginTop: "10px"}}>
        <Space>
        <QuestionCircleFilled style={{fontSize: "20px", color: "#898989"}} />
        <Badge dot>

        <BellFilled style={{fontSize: "20px", cursor:"pointer", color: "#898989"}} />
        </Badge>
    
        </Space>

        <img style={{borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", marginTop: "15px"}} src={admin}  alt="img" />
          
          <div className='d-flex flex-column'>
          <h5 style={{marginTop:"12px", marginBottom: "0px"}}>John Doe</h5>
          <h6 style={{color: "#898989"}}>Admin</h6>      

          </div>
      
        </div>
       
        </Header>

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