import React,{ useState, useEffect } from 'react';
import { useBillContext } from '../../context/BillContext';
import { Input, Form, InputNumber } from 'antd';

const Editable = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = React.useRef(null);
  const [form] = Form.useForm(); // Get the form instance
  const {
    state: { selectedInvoice },
    dispatch,
  } = useBillContext();

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values }, { dataIndex });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  const isEditable = editable && (dataIndex === "height" && record.image_src === '' || dataIndex === "width" && record.image_src === '' || dataIndex === "description");

  if (isEditable) {
    childNode = editing ? (
      <Form form={form} initialValues={{ [dataIndex]: record[dataIndex] }}>
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
          {dataIndex === "height" || dataIndex === "width" ? (
            <InputNumber
              ref={inputRef}
              variant="filled"
              onPressEnter={save}
              min={0}
              max={2000}
              precision={2}
              onBlur={save}
              onChange={(value) => {
                if(dataIndex === "height")
                dispatch({
                  type: "setHeight",
                  payload: {
                    key: record.key,
                    height: value

                  }
                })
                else
                dispatch({
                  type: "setWidth",
                  payload: {
                    key: record.key,
                    width: value

                  }
                })

              }}
            />
          ) : dataIndex === "description" ? (
            <Input
              ref={inputRef}
              variant="filled"
              onPressEnter={save}
              onBlur={save}
              style={{color: "#0B6E4F"}}
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
