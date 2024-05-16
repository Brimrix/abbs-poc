import React, { useState } from 'react';
import { Layout, Input, DatePicker, Divider, Select  } from 'antd';
const {Header} = Layout;
import '@styles/ClientSearchStyle.css';

import {

    UserOutlined, CalendarOutlined, MessageOutlined, CloudDownloadOutlined, MailOutlined, PrinterOutlined

} from '@ant-design/icons';

const secondary_color = "#FA9F42";

const listOptions = [{"label":"Talbot","value":"2295 Kim Trail"},
{"label":"Lyndell","value":"68 Forest Run Circle"},
{"label":"Zacharias","value":"84 Russell Hill"},
{"label":"Mead","value":"77 Lotheville Way"},
{"label":"Cindie","value":"4398 Hauk Place"},
{"label":"Maynord","value":"4915 Everett Avenue"},
{"label":"Randa","value":"79 Caliangt Place"},
{"label":"Elset","value":"120 Del Mar Trail"},
{"label":"Nissie","value":"63 Bultman Avenue"},
{"label":"Bradly","value":"78500 Carioca Road"},
{"label":"Freddy","value":"76614 Hagan Center"},
{"label":"Ruperto","value":"33 Springview Lane"},
{"label":"Zacharias","value":"9732 Melody Crossing"},
{"label":"Marten","value":"88510 Village Green Drive"},
{"label":"Claudette","value":"496 Petterle Point"},
{"label":"Stevana","value":"3 Manley Point"},
{"label":"Adi","value":"7268 Nevada Junction"},
{"label":"Carolynn","value":"55 Brentwood Way"},
{"label":"Phip","value":"049 Dapin Alley"},
{"label":"Susie","value":"86913 Toban Parkway"},
{"label":"Obediah","value":"6055 Sachs Plaza"},
{"label":"Rosie","value":"05889 Mccormick Way"},
{"label":"Finlay","value":"7 Iowa Place"},
{"label":"Viki","value":"84 Utah Pass"},
{"label":"Moss","value":"645 Blue Bill Park Street"},
{"label":"Marthe","value":"68 Fisk Circle"},
{"label":"Morry","value":"6 Mccormick Road"},
{"label":"Gardener","value":"1865 Service Way"},
{"label":"Isidoro","value":"534 Lawn Park"},
{"label":"Kermit","value":"724 Mifflin Plaza"}];


const ClientSearch = () => {

    const [currentOptions, setCurrentOptions] = useState(listOptions);

    const Secondary_Nav_Icon_style={color: "white", fontSize: "30px", backgroundColor: secondary_color, padding: "6px", borderRadius: "20%", cursor:"pointer", height: "30px", width: "30px"}

    const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  return (
    <>

      <Header className='bg-white d-flex align-items-center justify-content-between'>
      
       
      <div className=' d-flex justify-content-start align-items-center'>

{/* Above I am using the Bootstrap Classes */}

        <div className='client-search-container'>
        <UserOutlined className='prefix-icon-wrapper' style={{color: secondary_color}} />
         <Select showSearch={true} allowClear={true} filterOption={filterOption} options={currentOptions} placeholder={"Client"} style={{width: "310px", margin: "10px"}} />
        </div>




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