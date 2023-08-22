import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Role } from '../utils/enums/role.enum';
import { User } from '../features/manage/tables/users-table/types/user';
import { fetchProfile } from '../api/users/profile.req';

export interface BasicUserInfo {
  id: number;
  email: string;
  role: Role;
}

//TODO change to full user object
export interface UserState extends BasicUserInfo {
  profile: User | null;
  status: 'loading' | 'idle' | 'failed';
  loggedIn: boolean;
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
  id: 0,
  email: '',
  role: Role.USUARIO,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<BasicUserInfo>) => {
      const { id, email, role } = action.payload;
      state.id = id;
      state.email = email;
      state.role = role;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.id = initialState.id;
      state.email = initialState.email;
      state.role = initialState.role;
      state.loggedIn = initialState.loggedIn;
    },
    resetProfile: (state) => {
      state.profile = initialState.profile;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfile.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'idle';
        state.profile = action.payload;
      });
  },
});

export const getProfile = createAsyncThunk('user/getProfile', async () => {
  const response = await fetchProfile();
  const user: User = response.data;

  return user;
});

export const { login, logout, resetProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const selectUserProfile = (state: RootState) => state.user.profile;

export default userSlice.reducer;
