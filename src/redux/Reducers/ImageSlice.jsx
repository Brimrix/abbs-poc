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

    addDimensions: (state = initialState, action) => {
       
      state.dimension.image_name = action.payload.name;
        state.dimension.width = action.payload.width;
        state.dimension.height = action.payload.height;
		
      },

    getDimension: (state = initialState) => {
      return {image_name, height, width}
    }
  },
})

// Action creators are generated for each case reducer function
export const { addDimensions, getDimension } = ImageSlice.actions

export default ImageSlice.reducer;