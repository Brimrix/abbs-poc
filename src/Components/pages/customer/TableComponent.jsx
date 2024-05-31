import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UserDeleteOutlined } from "@ant-design/icons";
import "@styles/customer_table.css";
import customerData from "@/data/customer.json";


const TableComponent = () => {
  const [data, setData] = useState(customerData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState();
  const [form] = Form.useForm();


  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

 

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Successfully deleted customer record");
    setIsDeleteOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecord) {
          setData(
            data.map((item, index) =>
              item.key === editingRecord.key
                ? { ...values, key: item.key, order: Number(index + 1) }
                : item
            )
          );
        } else {
          setData([...data, { ...values, key: `${data.length + 1}` }]);
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteOpen(false);
  }
  const columns = [
    {
      title: "Sr#",
      dataIndex: "order",
      key: "order",
      align: 'center',
      width: '5%'
    },
   
    {
      title: <span>Customer Name</span>,
      dataIndex: "name",
      key: "name",
      align: 'center'

    },
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company",
      align: 'center'

    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: 'center'

    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
      align: 'center'

    },
    {
      title: "Action",
      key: "action",
      align: 'center',

      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<UserDeleteOutlined />}
            onClick={() => {
              setDeleteKey(record.key);
              setIsDeleteOpen(true);
            }
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
        Add
      </Button>
      <Table
        className="booking_information_table"
        scroll={{ y: 220 }}
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ marginTop: 20 }}
      />
      <Modal
        title={editingRecord ? "Edit Record" : "Add Record"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="company_name"
            label="Company"
            rules={[{ required: true, message: "Please input the Company!" }]}
          >
            <Input type="email" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" , pattern: new RegExp("/\S+@\S+\.\S+/")}]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact. No"
            rules={[{ required: true, message: "Please input the contact!" }]}
          >
            <Input type="tel" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal 
      open={isDeleteOpen}
      title="Are you sure you want to delete ?"
      onOk={() => handleDelete(deleteKey)}
      onCancel={handleDeleteCancel}
      
      >


      </Modal>
    </div>
  );
};

export default TableComponent;
