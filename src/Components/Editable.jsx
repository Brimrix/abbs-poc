import React, { useState, useContext, useEffect } from 'react';
import { Input, Form, InputNumber } from 'antd';
import { billContext } from '@/context/BillContext';

const Editable = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = React.useRef(null);
  const { dispatch } = useContext(billContext);
  const [form] = Form.useForm(); // Get the form instance

  const toggleEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const save = async () => {
    try {
      toggleEdit();
      if (dataIndex === "height") {
        handleSave({ ...record, height: inputRef.current.value }, { dataIndex });
      } else if (dataIndex === "width") {
        handleSave({ ...record, width: inputRef.current.value }, { dataIndex });
      } else if (dataIndex === "image_name") {
        handleSave({ ...record, image_name: inputRef.current.input.value }, { dataIndex });
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  const isEditable = editable && (dataIndex === "height" && record.image_src === '' || dataIndex === "width" && record.image_src === '' || dataIndex === "image_name");

  if (isEditable) {
    childNode = editing ? (
      <Form form={form}>
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          {dataIndex === "height" && record.image_src === '' || dataIndex === "width" && record.image_src === '' ? (
            <InputNumber
              ref={inputRef}
              variant="filled"
              onPressEnter={save}
              min={0}
              max={1000}
              precision={2}
              onBlur={save}
              defaultValue={dataIndex === "height" ? record.height || 0 : record.width || 0}
            />
          ) : dataIndex === "image_name" ? (
            <Input
              ref={inputRef}
              variant="filled"
              onPressEnter={save}
              onBlur={save}
              defaultValue={record.image_name || ''}
            />
          ) : null}
        </Form.Item>
      </Form>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  } else if (editable && !isEditable) {
    childNode = (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default Editable;
