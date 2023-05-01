import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerNewUser } from '../../api/sign-up/signup';
import { SignUpBody } from '../../utils/options/types/sign-up-body';
import { AccountInfo } from './types/account-info';
import axios, { AxiosError } from 'axios';

export interface SignUpState {
  status: 'idle' | 'loading' | 'failed';
  isLoading: boolean;
  accountInfo: AccountInfo | null;
  error?: any;
}

const initialState: SignUpState = {
  status: 'idle',
  isLoading: false,
  accountInfo: null,
  error: null,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    resetSignUp: (state) => {
      state.status = initialState.status;
      state.isLoading = initialState.isLoading;
      state.accountInfo = initialState.accountInfo;
      state.error = initialState.error;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSignUp.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(performSignUp.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        //TODO get Error message
        state.error = action.payload;
      })
      .addCase(
        performSignUp.fulfilled,
        (state, action: PayloadAction<AccountInfo>) => {
          state.status = 'idle';
          state.isLoading = false;
          state.accountInfo = action.payload;
        }
      );
  },
});

export const performSignUp = createAsyncThunk(
  'signUp/performSignUp',
  async (body: SignUpBody, thunkAPI) => {
    try {
      const response = await registerNewUser(body);

      return response.data;
    } catch (e: any) {
      if (e.isAxiosError) {
        if (typeof e.response.data.message === 'string') {
          const error = [e.response.data.message];

          return thunkAPI.rejectWithValue(error);
        }

        const errors = [...e.response.data.message].map((error: string) => {
          const afterDot = error.indexOf('.') + 1;

          return error.substring(afterDot);
        });

        return thunkAPI.rejectWithValue(errors);
      }
    }
  }
);

export const { resetSignUp } = signUpSlice.actions;

export const selectSignUp = (state: RootState) => state.signUp;

export default signUpSlice.reducer;
