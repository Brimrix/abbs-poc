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
  // SettingOutlined,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  FileOutlined,
  // BarsOutlined,
  MessageOutlined,
  QuestionCircleOutlined,

} from '@ant-design/icons';
import TableComponent from './Table';
import { Layout, Menu, theme, Input, DatePicker  } from 'antd';
import Sider_main from './Sider_main';


const { Header, Content, Footer, Sider } = Layout;
const {Search} = Input;


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
          style={{width: 300, margin: "10px"}}
         />

        

        <div style={{color: "black", display: "flex", gap:"10px", marginTop: "5px"}}>
        

        <img style={{borderRadius: "50%", width: "40px", height: "40px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LlhUvmgaHqmmXuH06eS-yFEr6ht7kMxDqA&s" alt="" />
          
          <div className='d-flex flex-column'>
          <h5>John Doe</h5>
          <h6 className='h6'>Admin</h6>      

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
     
       <div className='d-flex align-items-center gap-3'>
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
           
          }}
        >

          <div className='p-4'>

        <TableComponent />
      
          </div>
            
        </Content>
     
      </Layout>
    </Layout>
  );
};
export default Layout_Grid;