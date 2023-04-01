import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../../../../api/users/login";
import { RootState } from "../../../../app/store";

import { User } from "./types/user";

export interface UsersTableState {
  status: "idle" | "loading" | "failed";
  list: User[];
  selected?: User | null;
}

const initialState: UsersTableState = {
  status: "idle",
  list: [],
  selected: null,
};

export const usersTableSlice = createSlice({
  name: "usersTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        getUsersList.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "idle";
          state.list = action.payload;
        }
      );
  },
});

export const getUsersList = createAsyncThunk(
  "usersTable/getUsers",
  async () => {
    const response = await fetchUsers();
    const users: User[] = response.data;

    return users;
  }
);

export const {} = usersTableSlice.actions;

export const selectUsersTable = (state: RootState) => state.usersTable;

export default usersTableSlice.reducer;
