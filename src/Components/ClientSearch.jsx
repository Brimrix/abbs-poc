import React from 'react';
import { Layout, Input, DatePicker, Divider  } from 'antd';
const {Header} = Layout;

import {

    UserOutlined, CalendarOutlined, MessageOutlined, CloudDownloadOutlined, MailOutlined, PrinterOutlined

} from '@ant-design/icons';

const secondary_color = "#FA9F42";



const ClientSearch = () => {

    const Secondary_Nav_Icon_style={color: "white", fontSize: "30px", backgroundColor: secondary_color, padding: "6px", borderRadius: "20%", cursor:"pointer", height: "30px", width: "30px"}


  return (
    <>

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
         <CloudDownloadOutlined style={Secondary_Nav_Icon_style} />
         <MailOutlined style={Secondary_Nav_Icon_style} />
         <PrinterOutlined style={Secondary_Nav_Icon_style} />

      </div>
       
     </Header>

     <div style={{marginLeft: "30px", marginRight: "30px"}}>
     <Divider style={{backgroundColor: '#DCDCDC', marginTop: 0, opacity: '45%', marginBottom: 0}} />
     </div>

    </>
  )
}

export default ClientSearch;