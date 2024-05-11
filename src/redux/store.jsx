import { configureStore } from '@reduxjs/toolkit';
import { ImageSlice } from './Reducers/ImageSlice';
import { useStore } from 'react-redux';


const store = configureStore({
  reducer: {ImageSlice},
})

export default store;