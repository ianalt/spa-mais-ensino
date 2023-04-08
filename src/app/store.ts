import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import knowledgeAreasTableReducer from '../features/manage/tables/knowledge-areas-table/knowledgeAreasTableSlice';
import usersTableReducer from '../features/manage/tables/users-table/usersTableSlice';
import knowledgeAreasReducer from '../slices/knowledgeAreasSlice';
import userReducer from '../user/userSlice';
import subjectsTableReducer from '../features/manage/tables/subjects-table/subjectsTableSlice';
import categoriesTableReducer from '../features/manage/tables/categories-table/categoriesTableSlice';
import topicsTableReducer from '../features/manage/tables/topics-table/topicsTableSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    knowledgeAreas: knowledgeAreasReducer,
    usersTable: usersTableReducer,
    knowledgeAreasTable: knowledgeAreasTableReducer,
    subjectsTable: subjectsTableReducer,
    categoriesTable: categoriesTableReducer,
    topicsTable: topicsTableReducer,
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
