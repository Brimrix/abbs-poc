import React, { useEffect, useState } from "react";
import { Layout, DatePicker, Select, Popover } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  CloudDownloadOutlined,
  MailOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import customerData from "@/data/customer.json";

const { Header } = Layout;

const IconLink = ({ icon }) => (
  <div className="text-white text-lg flex justify-center !bg-secondary p-[6px] rounded-lg cursor-pointer h-[30px] w-[30px]">
    {icon}
  </div>
);

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

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Header className="bg-white flex items-center justify-between">
      <div className="flex justify-start items-center">
        <Select
          suffixIcon={<UserOutlined className="!text-secondary !text-lg" />}
          showSearch
          allowClear
          filterOption={filterOption}
          options={currentOptions}
          placeholder="Client"
          className="w-[310px] m-[10px]"
        />
        <Popover placement="top" content={<span>Due Date</span>}>
          <DatePicker
            suffixIcon={<CalendarOutlined className="!text-secondary !text-lg" />}
          />
        </Popover>
      </div>
      <div className="flex items-center gap-1 mr-5">
        <IconLink icon={<MessageOutlined />} />
        <IconLink icon={<CloudDownloadOutlined />} />
        <IconLink icon={<MailOutlined />} />
        <IconLink icon={<PrinterOutlined />} />
      </div>
    </Header>
  );
}

export default ClientSearch;
