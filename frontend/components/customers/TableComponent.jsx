import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import "@styles/customer_table.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import customerData from "@/data/customer.json";

const TableComponent = () => {
  const [data, setData] = useState(customerData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState();
  const [value, setValue] = useState();

  const formRef = useRef();

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
    let filteredArray = data.filter((item) => item.key !== key);

    filteredArray.forEach((item, index) => {
      item.order = index + 1;
      item.key = index;
    });

    setData(filteredArray);
    message.success("Successfully deleted !");
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

          message.success("Successfully edited !");
        } else {
          setData([
            ...data,
            {
              ...values,
              key: `${data.length + 1}`,
              order: `${data.length + 1}`,
            },
          ]);
          message.success("Added successfully !");
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        const arrayForm = info.errorFields[0].name;
        if (arrayForm[0] === "email")
          formRef.current.focus();
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteOpen(false);
  };
  const columns = [
    {
      title: "Sr#",
      dataIndex: "order",
      key: "order",
      align: "center",
      width: "5%",
    },

    {
      title: <span>Customer Name</span>,
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="primary-btn"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger={true}
            className="danger-btn"
            icon={<UserDeleteOutlined />}
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
    <div>
      <Button
        className="float-end mx-4 my-3 primary-btn"
        type="primary"
        onClick={handleAdd}
        icon={<PlusOutlined />}
      >
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
        okButtonProps={{ className: "primary-btn" }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="bg-white" />
          </Form.Item>

          <Form.Item

            name="company_name"
            label="Company"
            rules={[{ required: true, message: "Please input the Company!" }]}
          >
            <Input className="bg-white" type="text" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"

            rules={[
              { required: true, message: "Please input the email!" },
              {
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input className="bg-white" ref={formRef} type="email" />
          </Form.Item>

          <Form.Item
            name="contact"
            label="Contact. No"
            rules={[
              { required: true, message: "Please input the contact!" },
              {
                pattern:
                  /^(\+?\d{1,4}[.-\s]?)?\(?\d{3}\)?[.-\s]?\d{3}[.-\s]?\d{4}$/,
                message:
                  "Please enter a phone number"

              },
            ]}
          >
            <PhoneInput country={"pk"} value={value} onChange={setValue} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        okButtonProps={{ className: "danger-btn" }}
        open={isDeleteOpen}
        okText="Delete"
        title="Are you sure you want to Delete ?"
        onOk={() => handleDelete(deleteKey)}
        onCancel={handleDeleteCancel}
      ></Modal>
    </div>
  );
};

export default TableComponent;
