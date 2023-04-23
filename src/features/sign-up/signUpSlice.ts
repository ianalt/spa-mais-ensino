import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerNewUser } from '../../api/sign-up/signup';
import { SignUpBody } from '../../utils/options/types/sign-up-body';
import { AccountStatus } from './types/account-status';

export interface SignUpState {
  status: 'idle' | 'loading' | 'failed';
  isLoading: boolean;
  accountStatus: AccountStatus | null;
}

const initialState: SignUpState = {
  status: 'idle',
  isLoading: false,
  accountStatus: null,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    resetSignUp: (state) => {
      state.status = initialState.status;
      state.isLoading = initialState.isLoading;
      state.accountStatus = initialState.accountStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSignUp.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(performSignUp.rejected, (state) => {
        state.status = 'failed';
        state.isLoading = false;
      })
      .addCase(
        performSignUp.fulfilled,
        (state, action: PayloadAction<AccountStatus>) => {
          state.status = 'idle';
          state.isLoading = false;
          state.accountStatus = action.payload;
        }
      );
  },
});

export const performSignUp = createAsyncThunk(
  'signUp/performSignUp',
  async (body: SignUpBody) => {
    const response = await registerNewUser(body);

    return response.data;
  }
);

export const {} = signUpSlice.actions;

export const selectSignUp = (state: RootState) => state.signUp;

export default signUpSlice.reducer;
