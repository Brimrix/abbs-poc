import React, { useEffect, useState } from "react";
import ClientSearch from "@/components/common/ClientSearch";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin, Divider } from "antd";
import Table from "@/components/invoices/Table";

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
      <div className="grow flex flex-col justify-between">
        <Table tableId={Number(Date.now())} />
      </div>
      <div className="self-end">
        <CardComponent />
      </div>
    </>
  );
};

export default InvoiceCreate;
