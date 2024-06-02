import React, { useState, useContext } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Modal, message, Popover } from 'antd';
import { billContext } from '@/context/BillContext';

function DeleteIcon({ _id }) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(billContext);

  const handleClick = () => {
    setOpen(true);
  };

  const handleOkay = (requiredKey) => {
    dispatch({
      type: 'REMOVE_ROW',
      payload: {
        _key: requiredKey,
      },
    });

    setOpen(false);
    message.success('Successfully Removed');
  };

  return (
    <>
      <Modal
        open={open}
        okText="Delete"
        title="Confirmation"
        onOk={() => handleOkay(_id)}
        onCancel={() => setOpen(false)}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>

            <CancelBtn />
            <OkBtn />
          </>
        )}
      >

        <span>Are you sure you want to delete ? </span>

      </Modal>
      <Popover
        placement="top"
        content="Remove Row"

      >

        <MinusCircleOutlined onClick={handleClick} style={{ fontSize: '15px', color: '#C41E3A' }} />

      </Popover>
    </>

  );
}

export default DeleteIcon;
