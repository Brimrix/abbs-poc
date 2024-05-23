import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { useContext } from 'react';
import { billContext } from '@/context/BillContext';

const PriceComponent = ({_id, defaultInputValue, reRender}) => {
  const [value, setValue] = useState('');
  const {state, dispatch} = useContext(billContext);
  const [defaultVal, setDefaultVal] = useState(0);
  const [stateArea, setStateArea] = useState(0);
  const [statePrice, setStatePrice] = useState(0);
  const [eventDispatch, setEventDispatch] = useState(false);
 

  useEffect(() => {
       
      setValue(defaultInputValue); 
      setStateArea(state.billData[_id].area);
      setStatePrice(state.billData[_id].actualPrice);
  
  }, [reRender]);

  useEffect(() => {

    dispatch({
      type: "QUANTITY_CHANGE",
      payload: {
          _key: _id,
          actualQuantity: value,
          AMOUNT: Math.round((stateArea * statePrice * value) * 100) / 100,

      }
  })


  }, [stateArea, statePrice, eventDispatch]);

  const handleQuantityChange = (value) => {
    setValue(value);
  }
  const handleBlurChange = (_id) => {

    setStateArea(state.billData[_id].area);
    setStatePrice(state.billData[_id].actualPrice);
    setEventDispatch((prev) => !prev);
  }
  return (
    <InputNumber value={value} onChange={handleQuantityChange} onBlur={() => handleBlurChange(_id)} min={0} variant='filled' max={1000} precision={2}  />
  )
}

export default PriceComponent;