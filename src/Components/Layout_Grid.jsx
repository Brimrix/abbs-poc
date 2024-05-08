import React, { useState } from 'react';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Input  } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const {Search} = Input;

const items = [ 
  {
  key: 1, 
  icon: <UserOutlined />,
  label: 'Dashboard',
  danger: true
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
}

];


const Layout_Grid = () => {
  const [collapse, setCollapse] = useState(false);
  const handleClick = () => {
    setCollapse(!collapse);
  }

  const primary_color = "#0B6E4F";
  const secondary_color = "#FA9F42";
  const iconStyle = {float: "right", color: "white", fontSize: "30px", cursor: "pointer"};
 
  return (
    <Layout hasSider>
     
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
        <div style={{margin: "20px", display: "flex", alignItems:"center", justifyContent:"space-between"}}>
           
            {
                collapse ? <i onClick={handleClick} style={iconStyle} class="fa-solid fa-angles-right"></i>  : <> <h4 style={{color: "white"}}>ABBS</h4><i onClick={handleClick} style={iconStyle} class="fa-solid fa-angles-left"></i> </>
            }
       </div>
       

       
        <Menu theme='dark'  mode="inline" defaultSelectedKeys={['4']} items={items} style={{backgroundColor: primary_color}} />

        
      </Sider>

    {/* Sider End */}

      <Layout>

        {/* Header is the place directly connected with the Sider */}
        <Header style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>


      

        <Search
          placeholder="Search"
          allowClear
          style={{width: 300, margin: "10px"}}
         />

        <div style={{color: "white", display: "flex", alignItems: "center", gap:"10px"}}>
        <TeamOutlined style={{color: "white", fontSize: "35px"}} />
     
          <h5>John Doe</h5>
       
      
        </div>
       
        



        </Header>
       

     
        
        {/* Content Is The Place for everything Tables etc */}


        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            border: "2px solid red"
          }}
        >


  
            
        </Content>
     
      </Layout>
    </Layout>
  );
};
export default Layout_Grid;