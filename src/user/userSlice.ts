import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface UserBase {
  id: number;
  name: string;
  level: 'user' | 'admin';
}

export interface UserState extends UserBase {
  loggedIn: boolean;
}

const initialState: UserState = {
  id: 1,
  name: 'Ian Alt',
  level: 'user',
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action: PayloadAction<UserBase>) => {
      const { id, name, level } = action.payload;
      state.name = name;
      state.id = id;
      state.level = level;
      state.loggedIn = true;
    },
    incrementId: (state, action: PayloadAction<number>) => {
      state.id = state.id + action.payload;
    },
    logout: (state) => {
      state.name = initialState.name;
      state.id = initialState.id;
      state.level = initialState.level;
      state.loggedIn = initialState.loggedIn;

      // navigate('/login');
    },
  },
});

export const { login, logout, incrementId } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
