import React from 'react';
import LayoutMain from "@/components/LayoutMain";
import Table from "@/components/Table";
import ClientSearch from '@/components/ClientSearch';
import Card from '@/components/Card';

function CreateBill() {
  return (
    <LayoutMain firstChildren={<ClientSearch />} secondChildren={<Table />} thirdChildren={<Card />} />
  );
}

export default CreateBill;
