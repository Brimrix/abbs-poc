import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import { InputNumber } from 'antd';
import { billContext } from '@/context/BillContext';

function PriceComponent({ _id, defaultInputValue, reRender }) {
  const [value, setValue] = useState(0);
  const { state, dispatch } = useContext(billContext);

  useEffect(() => {
    let flag = true;
    if (flag) {
      setValue(defaultInputValue);
      dispatch({
        type: 'PRICE_CHANGE',
        payload: {
          _key: _id,
          actualPrice: defaultInputValue,
          AMOUNT: Math.round((state.billData[_id].area * defaultInputValue * state.billData[_id].actualQuantity) * 100) / 100,
        },
      });
    }
    return () => flag = false;
  }, [reRender, defaultInputValue]);

  const handlePriceChange = (value) => {
    setValue(value);
  };
  const handleBlurChange = (_id) => {
    dispatch({
      type: 'PRICE_CHANGE',
      payload: {
        _key: _id,
        actualPrice: value,
        AMOUNT: Math.round((state.billData[_id].area * value * state.billData[_id].actualQuantity) * 100) / 100,
      },
    });
  };

  return (
    <InputNumber value={value} onChange={handlePriceChange} onBlur={() => handleBlurChange(_id)} min={0} variant="filled" max={1000} precision={2} />
  );
}

export default PriceComponent;
