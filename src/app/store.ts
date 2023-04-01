import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../user/userSlice";
import knowledgeAreasReducer from "../slices/knowledgeAreasSlice";
import usersTableReducer from "../features/manage/tables/users-table/usersTableSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    knowledgeAreas: knowledgeAreasReducer,
    usersTable: usersTableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
