import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { useContext } from 'react';
import { billContext } from '@/context/BillContext';

const PriceComponent = ({_id, defaultInputValue}) => {
  const [value, setValue] = useState(0);
  const {state, dispatch} = useContext(billContext);

  useEffect(() => {
    
    debugger;
    setValue(defaultInputValue); 

  }, [defaultInputValue, _id]);


  const handlePriceChange = (value) => {
    setValue(value);
  }
  const handleBlurChange = (_id) => {
    dispatch({
        type: "PRICE_CHANGE",
        payload: {
            _key: _id,
            actualPrice: value,
            AMOUNT: Math.round((state.billData[_id].area * value * state.billData[_id].actualQuantity) * 100) / 100,
        }
    })
    
  }

  return (
    <InputNumber value={value} onChange={handlePriceChange} onBlur={() => handleBlurChange(_id)} min={0} variant='filled' max={1000} precision={2}  />
  )
}

export default PriceComponent;