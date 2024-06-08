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

  const Secondary_Nav_Icon_style =
    "text-white text-lg bg-orange p-[6px] rounded-lg cursor-pointer h-[30px] w-[30px]";

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Header className="bg-white flex items-center justify-between">
      <div className="flex justify-start items-center">
        <Select
          suffixIcon={<UserOutlined className="text-orange text-lg" />}
          showSearch
          allowClear
          filterOption={filterOption}
          options={currentOptions}
          placeholder="Client"
          className="w-[310px] m-[10px]"
        />
        <Popover placement="top" content={<span>Due Date</span>}>
          <DatePicker
            suffixIcon={<CalendarOutlined className="text-orange text-lg" />}
          />
        </Popover>
      </div>
      <div className="flex items-center gap-1 mr-5">
        <MessageOutlined className={Secondary_Nav_Icon_style} />
        <CloudDownloadOutlined className={Secondary_Nav_Icon_style} />
        <MailOutlined className={Secondary_Nav_Icon_style} />
        <PrinterOutlined className={Secondary_Nav_Icon_style} />
      </div>
    </Header>
  );
}

export default ClientSearch;
