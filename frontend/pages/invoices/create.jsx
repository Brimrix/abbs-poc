import React, { useEffect, useState } from "react";
import Order from "@/components/invoices/Order";
import ClientSearch from "@/components/common/ClientSearch";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin, Divider } from "antd";
import Context from "@/components/invoices/Context";

const InvoiceCreate = () => {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    setSpinning(true);
  }, []);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return mount ? (
    <Spin spinning={mount} />
  ) : (
    <>
      <ClientSearch />
      <Divider className="m-0 border-2" />
      <div className="grow">
        <Order />
      </div>
      <div className="self-end">
        <CardComponent />
      </div>
    </>
  );
};

export default InvoiceCreate;
