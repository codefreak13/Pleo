import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

type USER_STATE = {
  firstName: string;
  email: string;
  lastName: string;
};

const initialState: USER_STATE = {
  firstName: '',
  email: '',
  lastName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
  },
});

export const {setFirstName, setEmail, setLastName} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
