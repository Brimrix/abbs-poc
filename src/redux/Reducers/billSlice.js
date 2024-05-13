import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  billingInfo: {
      totalArea: 0,
      totalAmount: 0

  }
}

export const billSlice = createSlice({
  name: 'billingInfo',
  initialState,
  reducers: {
    addBillingInfo: (state, action) => {
      const {totalArea, totalAmount} = action.payload;
    
      return {
        ...state,
        billingInfo: {
          ...state.billingInfo,
          totalAmount,
          totalArea
        }
      };
    },
    // getBillingInfo: (state) => {
    //   const { totalAmount, totalArea } = state.billingInfo;
    //   return { totalAmount, totalArea };
    // }
    getBillingInfo: (state) => {
      const { totalAmount, totalArea } = state.billingInfo;
      return { billingInfo: { totalAmount, totalArea } };
    }
  },
})

// Action creators are generated for each case reducer function
export const { addBillingInfo, getBillingInfo } = billSlice.actions

export default billSlice.reducer;
