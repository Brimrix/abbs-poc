import { configureStore } from '@reduxjs/toolkit';
import  billSlice  from './Reducers/billSlice';
import { useStore } from 'react-redux';


const store = configureStore({
  reducer: {billSlice},
})

export default store;