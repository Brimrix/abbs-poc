import React, { useEffect, useState } from "react";
import {
  Layout, DatePicker, Select, Popover,
} from 'antd';
import {
  UserOutlined, CalendarOutlined, MessageOutlined, CloudDownloadOutlined, MailOutlined, PrinterOutlined,
} from '@ant-design/icons';
import customerData from "@/data/customer.json";

const { Header } = Layout;

const secondary_color = "#FA9F42";

function ClientSearch() {
  const [currentOptions, setCurrentOptions] = useState([]);

  useEffect(() => {
    let options = [];
    let actualLabel = "";
    let actualValue = "";

    customerData.forEach((customer) => {
      actualLabel = customer.name;
      actualValue = customer.company_name;

      options.push({ label: actualLabel, value: actualValue });
    });
    setCurrentOptions(options);
  }, []);

  const Secondary_Nav_Icon_style = {
    color: "white",
    fontSize: "30px",
    backgroundColor: secondary_color,
    padding: "6px",
    borderRadius: "20%",
    cursor: "pointer",
    height: "30px",
    width: "30px",
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Header className="bg-white d-flex align-items-center justify-content-between">
      <div className=" d-flex justify-content-start align-items-center">
        {/* Above I am using the Bootstrap Classes */}
        <Select
          suffixIcon={
            <UserOutlined
              style={{ color: secondary_color, fontSize: "20px" }}
            />
          }
          showSearch
          allowClear
          filterOption={filterOption}
          options={currentOptions}
          placeholder="Client"
          style={{ width: "310px", margin: "10px" }}
        />
        <Popover placement="top" content={<span>Due Date</span>}>
          <DatePicker
            suffixIcon={
              <CalendarOutlined
                style={{ color: secondary_color, fontSize: "20px" }}
              />
            }
          />
        </Popover>
      </div>
      <div className="d-flex align-items-center gap-1 me-5">
        <MessageOutlined style={Secondary_Nav_Icon_style} />
        <CloudDownloadOutlined style={Secondary_Nav_Icon_style} />
        <MailOutlined style={Secondary_Nav_Icon_style} />
        <PrinterOutlined style={Secondary_Nav_Icon_style} />
      </div>
    </Header>
  );
}

export default ClientSearch;
