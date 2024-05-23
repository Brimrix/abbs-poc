import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { useContext } from 'react';
import { billContext } from '@/context/BillContext';

const PriceComponent = ({_id}) => {
  const [value, setValue] = useState('');
  const {state, dispatch} = useContext(billContext);
  const [defaultVal, setDefaultVal] = useState(0);
 

  const handlePriceChange = (value) => {
    setValue(value);
  }
  const handleBlurChange = (_id) => {
    dispatch({
        type: "QUANTITY_CHANGE",
        payload: {
            _key: _id,
            actualQuantity: value,
            AMOUNT: Math.round((state.billData[_id].area * state.billData[_id].actualPrice * value) * 100) / 100,

        }
    })


  }
  return (
    <InputNumber onChange={handlePriceChange} onBlur={() => handleBlurChange(_id)} min={0} variant='filled' max={1000} precision={2}  />
  )
}

export default PriceComponent;