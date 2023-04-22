import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerNewUser } from '../../api/sign-up/signup';
import { SignUpBody } from '../../utils/options/types/sign-up-body';

export interface SignUpState {
  status: 'idle' | 'loading' | 'failed';
  isLoading: boolean;
}

const initialState: SignUpState = {
  status: 'idle',
  isLoading: false,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    // setBirthDate: (state, action: PayloadAction<string>) => {
    //   const date = action.payload;
    //   state.birthDate = date;
    // },
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
      .addCase(performSignUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.isLoading = false;
      });
  },
});

export const performSignUp = createAsyncThunk(
  'signUp/performSignUp',
  async (body: SignUpBody) => {
    try {
      const response = await registerNewUser(body);

      return response.data;
    } catch (e: any) {
      if (e.isAxiosError) {
        console.log(e.response.data.message);
      }
    }
  }
);

export const {} = signUpSlice.actions;

export const selectSignUp = (state: RootState) => state.signUp;

export default signUpSlice.reducer;
