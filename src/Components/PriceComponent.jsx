import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { useContext } from 'react';
import { billContext } from '@/context/BillContext';

const PriceComponent = ({_id, defaultInputValue, reRender}) => {
  const [value, setValue] = useState(0);
  const {state, dispatch} = useContext(billContext);
  const [stateArea, setStateArea] = useState(0);
  const [stateQuantity, setStateQuantity] = useState(0);
  const [eventDispatch, setEventDispatch] = useState(false);

  useEffect(() => {
    
    setValue(defaultInputValue); 
    setStateArea(state.billData[_id].area);
    setStateQuantity(state.billData[_id].actualQuantity);

  }, [reRender]);

  useEffect(() => {

    dispatch({
      type: "PRICE_CHANGE",
      payload: {
          _key: _id,
          actualPrice: value,
          AMOUNT: Math.round((stateArea * value * stateQuantity) * 100) / 100,
      }
  })

  }, [stateArea, stateQuantity, eventDispatch]);

 

  const handlePriceChange = (value) => {
    setValue(value);
  }
  const handleBlurChange = (_id) => {

    setStateArea(state.billData[_id].area);
    setStateQuantity(state.billData[_id].actualQuantity);
    setEventDispatch((prev) => !prev);
    
  }

  return (
    <InputNumber value={value} onChange={handlePriceChange} onBlur={() => handleBlurChange(_id)} min={0} variant='filled' max={1000} precision={2}  />
  )
}

export default PriceComponent;