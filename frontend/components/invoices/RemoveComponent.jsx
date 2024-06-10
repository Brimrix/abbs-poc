import React, { useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Modal, message, Popover } from 'antd';
import { useBillContext } from '@/context/BillContext';

function DeleteIcon({ _id }) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useBillContext()

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
        okButtonProps={{className: 'btn-app-accent'}}
        cancelButtonProps={{className: 'btn-app-transparent'}}
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
