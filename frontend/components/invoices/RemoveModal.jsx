import React from 'react';
import { Modal } from 'antd';
import { useBillContext } from '@/context/BillContext';
const RemoveModal = ({deleteRow, setDeleteRow}) => {

    const {
        dispatch,
      } = useBillContext();


    const handleDeleteRow = () => {

      dispatch({
        type: 'deleteRow',
        payload: {
          key: deleteRow,
        },
      });
      setDeleteRow()
    }

      return (
        <Modal
        open={Boolean(deleteRow)}
        okText="Delete"
        okButtonProps={{ className: 'btn-app-accent' }}
        cancelButtonProps={{ className: 'text-primary' }}
        title="Confirmation"
        onOk={handleDeleteRow}
        onCancel={() => setDeleteRow(null)}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <span>Are you sure you want to delete ? </span>
      </Modal>
      )
    }

export default RemoveModal;
