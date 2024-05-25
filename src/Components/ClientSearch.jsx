import React, { useEffect, useState, useContext } from 'react';
import {
  Layout, Input, DatePicker, Divider, Select, Popover,
} from 'antd';
import {

  UserOutlined, CalendarOutlined, MessageOutlined, CloudDownloadOutlined, MailOutlined, PrinterOutlined,

} from '@ant-design/icons';
import { billContext } from '@/context/BillContext';

const { Header } = Layout;

const secondary_color = '#FA9F42';
const listOptions = [
  { label: 'Talbot', value: 'Talbot - 2295 Kim Trail' },
  { label: 'Lyndell', value: 'Lyndell - 68 Forest Run Circle' },
  { label: 'Zacharias', value: 'Zacharias - 84 Russell Hill' },
  { label: 'Mead', value: 'Mead - 77 Lotheville Way' },
  { label: 'Cindie', value: 'Cindie - 4398 Hauk Place' },
  { label: 'Maynord', value: 'Maynord - 4915 Everett Avenue' },
  { label: 'Randa', value: 'Randa - 79 Caliangt Place' },
  { label: 'Elset', value: 'Elset - 120 Del Mar Trail' },
  { label: 'Nissie', value: 'Nissie - 63 Bultman Avenue' },
  { label: 'Bradly', value: 'Bradly - 78500 Carioca Road' },
  { label: 'Freddy', value: 'Freddy - 76614 Hagan Center' },
  { label: 'Ruperto', value: 'Ruperto - 33 Springview Lane' },
  { label: 'Zacharias', value: 'Zacharias - 9732 Melody Crossing' },
  { label: 'Marten', value: 'Marten - 88510 Village Green Drive' },
  { label: 'Claudette', value: 'Claudette - 496 Petterle Point' },
  { label: 'Stevana', value: 'Stevana - 3 Manley Point' },
  { label: 'Adi', value: 'Adi - 7268 Nevada Junction' },
  { label: 'Carolynn', value: 'Carolynn - 55 Brentwood Way' },
  { label: 'Phip', value: 'Phip - 049 Dapin Alley' },
  { label: 'Susie', value: 'Susie - 86913 Toban Parkway' },
  { label: 'Obediah', value: 'Obediah - 6055 Sachs Plaza' },
  { label: 'Rosie', value: 'Rosie - 05889 Mccormick Way' },
  { label: 'Finlay', value: 'Finlay - 7 Iowa Place' },
  { label: 'Viki', value: 'Viki - 84 Utah Pass' },
  { label: 'Moss', value: 'Moss - 645 Blue Bill Park Street' },
  { label: 'Marthe', value: 'Marthe - 68 Fisk Circle' },
  { label: 'Morry', value: 'Morry - 6 Mccormick Road' },
  { label: 'Gardener', value: 'Gardener - 1865 Service Way' },
  { label: 'Isidoro', value: 'Isidoro - 534 Lawn Park' },
  { label: 'Kermit', value: 'Kermit - 724 Mifflin Plaza' },
];

function ClientSearch() {
  const { state, dispatch } = useContext(billContext);

  const [currentOptions, setCurrentOptions] = useState(listOptions);
  const [dateSelect, setDateSelect] = useState('');
  const [clientSelect, setClientSelect] = useState('');

  useEffect(() => {
    dispatch({
      type: 'SET_CLIENT_DETAILS',
      payload: {
        name: clientSelect,
        date: dateSelect,
      },
    });
  }, [dateSelect, clientSelect]);

  const Secondary_Nav_Icon_style = {
    color: 'white', fontSize: '30px', backgroundColor: secondary_color, padding: '6px', borderRadius: '20%', cursor: 'pointer', height: '30px', width: '30px',
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleDateChange = (value) => {
    if (value) setDateSelect(value.$d);
  };

  const handleSelectClient = (value) => {
    if (value) setClientSelect(value);
  };

  return (
    <>

      <Header className="bg-white d-flex align-items-center justify-content-between">

        <div className=" d-flex justify-content-start align-items-center">

          {/* Above I am using the Bootstrap Classes */}

          <Select onChange={handleSelectClient} suffixIcon={<UserOutlined style={{ color: secondary_color, fontSize: '20px' }} />} showSearch allowClear filterOption={filterOption} options={currentOptions} placeholder="Client" style={{ width: '310px', margin: '10px' }} />

          <Popover placement="top" content={<span>Due Date</span>}>
            <DatePicker onChange={handleDateChange} suffixIcon={<CalendarOutlined style={{ color: secondary_color, fontSize: '20px' }} />} />

          </Popover>

        </div>

        <div className="d-flex align-items-center gap-1 me-5">
          <MessageOutlined style={Secondary_Nav_Icon_style} />
          <CloudDownloadOutlined style={Secondary_Nav_Icon_style} />
          <MailOutlined style={Secondary_Nav_Icon_style} />
          <PrinterOutlined style={Secondary_Nav_Icon_style} />

        </div>

      </Header>

      <div style={{ marginLeft: '30px', marginRight: '30px' }}>
        <Divider style={{
          backgroundColor: '#DCDCDC', marginTop: 0, opacity: '45%', marginBottom: 0,
        }}
        />
      </div>

    </>
  );
}

export default ClientSearch;
