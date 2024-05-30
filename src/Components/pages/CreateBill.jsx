import React, { useEffect, useState } from "react";
import LayoutMain from "@/components/LayoutMain";
import Table from "@/components/Table";
import ClientSearch from "@/components/ClientSearch";
import Card from "@/components/Card";
import { Spin } from "antd";

function CreateBill() {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);
  useEffect(() => {
    setMount(false);
  }, [spinning]);

  useEffect(() => {
    setSpinning(true);
  }, []);

  return (
    <Spin spinning={mount} tip="Loading...">
      <LayoutMain
        FirstChild={<ClientSearch />}
        SecondChild={<Table />}
        ThirdChild={<Card />}
      />
    </Spin>
  );
}

export default CreateBill;
