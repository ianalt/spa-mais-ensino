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
  currentUser: User | null;
  status: 'loading' | 'idle' | 'failed';
  loggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
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
        state.currentUser = action.payload;
      });
  },
});

export const getProfile = createAsyncThunk('user/getProfile', async () => {
  const response = await fetchProfile();
  const user: User = response.data;

  return user;
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
