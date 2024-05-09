import React, { useState } from 'react';
import './Menu.css'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  FileOutlined,
  BarsOutlined,
  MessageOutlined,
  QuestionCircleOutlined,

} from '@ant-design/icons';

import { Layout, Menu, theme, Input, ConfigProvider, DatePicker  } from 'antd';
import TableComponent from './Table';

const { Header, Content, Footer, Sider } = Layout;
const {Search} = Input;
const primary_color = "#0B6E4F";
const secondary_color = "#FA9F42";


const items = [ 
  {
  key: 1, 
  icon: <UserOutlined />,
  label: 'Dashboard',
}, 
{
  key: 2,
  icon: <BarChartOutlined />,
  label: "Create New Bill"
},

{
  key: 3,
  icon: <UploadOutlined />,
  label: "Upload Images"
},
{
  key: 4,
  icon: <SettingOutlined />,
  label: "Settings"
}

];


const Layout_Grid = () => {
  const [collapse, setCollapse] = useState(false);
  const handleClick = () => {
    setCollapse(!collapse);
  }


  const iconStyle = {float: "right", color: "white", fontSize: "30px", cursor: "pointer"};
  const Secondary_Nav_Icon_style={color: "white", fontSize: "30px", backgroundColor: secondary_color, padding: "6px", borderRadius: "20%", cursor:"pointer", height: "30px", width: "30px"}
 
  return (
    <Layout>


     
     {/* Sider */}

     <Sider
        collapsed={collapse}
        collapsible
        width={"320px"}
        trigger = {null}
        style={{
          overflow: 'auto',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: primary_color,
        }}
      >
           
           <BarsOutlined onClick={handleClick} style={{float: 'right', color: "white", fontSize: "28px", padding: "25px"}} />
       

       
  
        <Menu theme='dark'  mode="inline" style={{backgroundColor: primary_color}} defaultSelectedKeys={['5']} items={items} />

        
      </Sider>

    {/* Sider End */}

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