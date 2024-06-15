import React, { useEffect, useState } from "react";
import { Table as AntDTable, Input, Form, message } from "antd";
import MainTable from "./Table";
import { useBillContext } from "@/context/BillContext";
import { PlusOutlined , DeleteOutlined} from "@ant-design/icons";
import { Button, Space, Modal } from "antd";


const Order = () => {
  const {
    state: { orderData },
    dispatch,
  } = useBillContext();

  const [data, setData] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState();

  useEffect(() => {

    setData(orderData);

  }, [orderData]);

  const handleOrderEdit = (key, newOrder) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index].order = newOrder;
      setData(newData);
    }
  };

  const handelAddOrder = () => {
    dispatch({
      type: "ORDER_ADD",
      payload: {
        key: Number(Date.now()),
      },
    });
  };

  const handleDelete = () => {
    dispatch({
        type: "ORDER_DELETE",
        payload: {
            key: deleteKey,
        }
    })
    setIsDeleteOpen(false);

  }
  const handleDeleteCancel = () => {
    setIsDeleteOpen(false);
  }
  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",

      render: (text, record) => (
        <EditableCell
          value={text}
          onSave={(newOrder) => handleOrderEdit(record.key, newOrder)}
        />
      ),
    },
    {
      title: "Total price",
      dataIndex: "price",
      key: "price",
      width: "30%",
      align: "center",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      width: "30%",
      align: "center",
    },
    {
        title: "Action",
        key: "action",
        align: "center",

        render: (record) => (
          <Space size="middle">

            <Button
              type="primary"
              className="btn-app-accent"
              icon={<DeleteOutlined />}
              onClick={() => {
                setDeleteKey(record.key);
                setIsDeleteOpen(true);
              }}
            >
            Delete
            </Button>
          </Space>
        ),
      },
  ];

  return (
    <>
      <Button
        className="float-end mx-4 my-3 btn-app-primary"
        type="primary"
        classNames={handelAddOrder}
        onClick={handelAddOrder}
        icon={<PlusOutlined />}
      >
        Add Order
      </Button>

      <AntDTable
        columns={columns}
        dataSource={data}
        pagination={false}
        className="order-table"
        expandable={{
          expandedRowRender: (row) => <MainTable tableId={row.key} />,
          rowExpandable: () => true,
        }}
      />

    <Modal
        okButtonProps={{ className: "btn-app-accent" }}
        cancelButtonProps={{className: "btn-app-transparent"}}
        open={isDeleteOpen}
        okText="Delete"
        title="Are you sure you want to Delete ?"
        onOk={() => handleDelete(deleteKey)}
        onCancel={handleDeleteCancel}
      ></Modal>

    </>
  );
};

const EditableCell = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const toggleEdit = () => {
    setEditing(!editing);
    setInputValue(value); // Reset input value on toggle
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    setEditing(false);
  };

  return editing ? (
    <Form.Item
      style={{ margin: 0 }}
      name="order"
      rules={[{ required: true, message: "Order is required" }]}
    >
      <Input
        className="w-[40%]"
        value={inputValue}
        defaultValue={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleSave}
        onBlur={handleSave}
        autoFocus
      />
    </Form.Item>
  ) : (
    <div style={{ minHeight: 32 }} onClick={toggleEdit}>
      {value}
    </div>
  );
};

export default Order;
