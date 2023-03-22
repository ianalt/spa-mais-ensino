import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface BasicUserInfo {
  id: number;
  email: string;
  role: "usuario" | "aluno" | "monitor" | "professor" | "admin";
}

export interface UserState extends BasicUserInfo {
  loggedIn: boolean;
}

const initialState: UserState = {
  id: 0,
  email: "",
  role: "usuario",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
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
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
