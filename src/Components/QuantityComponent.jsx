import React, { useEffect, useState, useContext } from 'react';
import { InputNumber } from 'antd';
import { billContext } from '@/context/BillContext';

function QuantityComponent({ _id, defaultInputValue, reRender }) {
  const [value, setValue] = useState('');
  const { state, dispatch } = useContext(billContext);

  useEffect(() => {
    debugger;
    let flag = true;
    if (flag) {
      setValue(defaultInputValue);
      dispatch({
        type: 'QUANTITY_CHANGE',
        payload: {
          _key: _id,
          actualQuantity: defaultInputValue,
          AMOUNT: Math.round((state.billData[_id].area * state.billData[_id].actualPrice * defaultInputValue) * 100) / 100,

        },
      });
    }

    return () => flag = false;
  }, [reRender, defaultInputValue]);

  const handleQuantityChange = (value) => {
    setValue(value);
  };
  const handleBlurChange = (_id) => {
    dispatch({
      type: 'QUANTITY_CHANGE',
      payload: {
        _key: _id,
        actualQuantity: value,
        AMOUNT: Math.round((state.billData[_id].area * state.billData[_id].actualPrice * value) * 100) / 100,

      },
    });
  };
  return (
    <InputNumber value={value} onChange={handleQuantityChange} onBlur={() => handleBlurChange(_id)} min={0} variant="filled" max={1000} precision={0} />
  );
}

export default QuantityComponent;
