import {createSlice} from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    toggleLoading: state => !state,
  },
});

const {toggleLoading} = loadingSlice.actions;

export {toggleLoading};
export default loadingSlice.reducer;
