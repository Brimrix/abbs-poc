import React, { useEffect, useState } from "react";
import LayoutMain from "@/components/layouts/Base";
import Table from "@/components/invoices/Table";
import ClientSearch from "@/components/common/ClientSearch";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin } from "antd";

const Invoices = () => {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);
  useEffect(() => {
    setSpinning(true);
  }, []);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return (
    <Spin spinning={mount} tip="Loading...">
      <LayoutMain>
        <ClientSearch />
        <div className="mt-2 px-4" style={{ height: "240px" }}>
          <Table />
        </div>

        <div className="d-flex px-4" style={{ marginTop: "80px" }}>
          <div className="p-2 w-100"></div>
          <div className="p-2 flex-shrink-1">
            <CardComponent />
          </div>
        </div>
      </LayoutMain>
    </Spin>
  );
};

export default Invoices;
