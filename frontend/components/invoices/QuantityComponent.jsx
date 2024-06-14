import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { useBillContext } from '@/context/BillContext';

function QuantityComponent({ _id, defaultInputValue, reRender, tableId }) {
  const [value, setValue] = useState('');
  const { state, dispatch } = useBillContext()
  useEffect(() => {
    let flag = true;
    if (flag) {
      setValue(defaultInputValue);
      dispatch({
        type: 'QUANTITY_CHANGE',
        payload: {
          _key: _id,
          actualQuantity: defaultInputValue,
          AMOUNT: Math.round((state.billData[_id].area * state.billData[_id].actualPrice * defaultInputValue) * 100) / 100,
          tableId,

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
        tableId,

      },
    });
  };
  return (
    <InputNumber value={value} onChange={handleQuantityChange} onBlur={() => handleBlurChange(_id)} min={1} variant="filled" max={1000} precision={0} />
  );
}

export default QuantityComponent;
