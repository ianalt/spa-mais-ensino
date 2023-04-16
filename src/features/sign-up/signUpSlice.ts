import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SignUpState {
  status: 'idle' | 'loading' | 'failed';
  birthDate: string;
}

const initialState: SignUpState = {
  status: 'idle',
  birthDate: '',
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setBirthDate: (state, action: PayloadAction<string>) => {
      const date = action.payload;

      state.birthDate = date;
    },
  },
});

export const { setBirthDate } = signUpSlice.actions;

export const selectSignUp = (state: RootState) => state.signUp;

export default signUpSlice.reducer;
