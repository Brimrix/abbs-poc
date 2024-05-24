import React, {  useEffect, useState, useContext } from 'react';
import { Button, Table, Upload, InputNumber, Typography, message, Popover } from 'antd';
import ImageSelector from '@/components/ImageSelector';
import '@styles/TableStyle.css';

import {billContext} from '@/context/BillContext';



const TableComponent = () => {

    const {state, dispatch} = useContext(billContext);
    const [rowsTable, setRowsTable] = useState([]);
    const [actualRows, setActualRows] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);

    useEffect(() => {
      setTableLoading(false);
    }, [actualRows])

    useEffect(() => {
      
      setActualRows(rowsTable);

    }, [rowsTable]);


    useEffect(() => {
      
      setTableLoading(true);
      setRowsTable(state.billData);

    }, [state.billData]);


    const handleAddRows = () => {
        dispatch({
          type: "ADD_ROW"
        })
    }

   
    const columns = [
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        width: '5%',
        align: 'center',        
        
      },
      {

        title: 'Sr#',
        dataIndex: 'order',
        key: 'order',
        width: '5%',
        align: 'center',        
        
      },

       {
        title: <span className="column-underlined">Description and Upload Image</span>,
        dataIndex: 'image_name',
        key: 'image_name',
        ellipsis: true,
        width: '25%',
        align: 'start'        
       
      },
      {
        title: '',
        dataIndex: 'upload',
        key: 'address',
        align: 'center',
        width: '10%'
      },
      
      {
          title: 'Height',
          dataIndex: 'height',
          key: 'height',
          align: 'center'
        },
  
        {
          title: 'Width',
          dataIndex: 'width',
          key: 'width',
          align: 'center'
        },
        {
          title: 'Area (Sq.ft)',
          dataIndex: 'area',
          key: 'area',
          align: 'center',
        
        },
  
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          align: 'center'
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          align: 'center'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          align: 'center'
        },
       
      
    ];



     
  
    
      
      return (
        
        <>

        <Table 
 
    
      style={{marginBottom: "20px"}}
      scroll={{ y: 220 }}
      pagination={false}
      loading={tableLoading}
      dataSource={actualRows} size={'small'} 
      columns={columns} />
    



      <Typography.Text 
      onClick={handleAddRows}
      strong={true}
      style={{cursor: "pointer", color: "#0B6E4F", marginLeft: "120px"}} >Add More Rows</Typography.Text>

      

        </>

  )
}

export default TableComponent;