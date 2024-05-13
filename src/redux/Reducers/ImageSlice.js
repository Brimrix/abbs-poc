import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dimension: {
    image_name: '',
    width: 0,
    height: 0,
  }
}

export const ImageSlice = createSlice({
  name: 'dimension',
  initialState,
  reducers: {
    addDimensions: (state, action) => {
      const { name, width, height } = action.payload;
      return {
        ...state,
        dimension: {
          ...state.dimension,
          image_name: name,
          width: width,
          height: height
        }
      };
    },
    getDimension: (state) => {
      const { image_name, width, height } = state.dimension;
      return { image_name, width, height };
    }
  },
})

// Action creators are generated for each case reducer function
export const { addDimensions, getDimension } = ImageSlice.actions

export default ImageSlice.reducer;
