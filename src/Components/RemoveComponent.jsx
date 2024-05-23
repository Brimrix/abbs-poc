import React, { useState, useContext } from 'react';
import {MinusCircleOutlined} from "@ant-design/icons";
import { Tooltip, Modal, message } from 'antd';
import '@styles/Tooltip.css';
import { billContext } from '@/context/BillContext';

const DeleteIcon = ({_id}) => {
    const [open, setOpen] = useState(false);
    const {state, dispatch} = useContext(billContext);


    const handleClick = () => {
        setOpen(true);
    }
    
    const handleOkay = (requiredKey) => {

        dispatch({
            type: "REMOVE_ROW",
            payload: {
                _key: requiredKey
            }
        })

        setOpen(false);
        message.success("Successfully Removed");
    }

    
    return (
       <>
        <Modal
        open={open}
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
    
        <span>Do you confirm to delete ? </span>
      
      
      </Modal>
    <Tooltip  title="Delete Row" arrow={false}> <MinusCircleOutlined onClick={handleClick} style={{fontSize: "15px", color: "#C41E3A"}}/> </Tooltip>
    </>

       
    )
}


export default DeleteIcon;