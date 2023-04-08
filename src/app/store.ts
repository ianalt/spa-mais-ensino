import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import knowledgeAreasTableReducer from "../features/manage/tables/knowledge-areas-table/knowledgeAreasTableSlice";
import usersTableReducer from "../features/manage/tables/users-table/usersTableSlice";
import knowledgeAreasReducer from "../slices/knowledgeAreasSlice";
import userReducer from "../user/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    knowledgeAreas: knowledgeAreasReducer,
    usersTable: usersTableReducer,
    knowledgeAreasTable: knowledgeAreasTableReducer,
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
