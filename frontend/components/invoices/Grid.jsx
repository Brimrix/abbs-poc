import React, { useEffect, useState } from 'react';
import { useBillContext } from "@/context/BillContext";
import Table from './Table';
export const Grid = () => {
    const {
        state: { orderCount }
        } = useBillContext();
    const [tableCount, setTableCount] = useState(orderCount.count);

    useEffect(() => {
        setTableCount(orderCount.count);
    }, [orderCount.count]);
  return (
    <div>
    {Array.from({ length: tableCount }).map((_, index) => (
      <Table />
    ))}
  </div>

  )
}
