import React, { Suspense } from 'react';
import { Layout, Input, Space, Badge, Divider, Avatar  } from 'antd';
import {QuestionCircleFilled, BellFilled, UserOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Search} = Input;


const NavbarMain = () => {
  return (
    <>
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
      
        <Suspense fallback={<h1>Loading.....</h1>}>       
        <Avatar size="small" style={{borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", marginTop: "15px"}} icon={<UserOutlined />} />   
        </Suspense>
          
          <div className='d-flex flex-column'>
          <h5 style={{marginTop:"12px", marginBottom: "0px"}}>John Doe</h5>
          <h6 style={{color: "#898989"}}>Admin</h6>      

          </div>
      
        </div>
       
        </Header>

      <Divider style={{backgroundColor: '#DCDCDC', marginTop: "0px", marginBottom: '0px', opacity: '45%'}} />

    </>
  )
}

export default NavbarMain;