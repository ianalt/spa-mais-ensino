import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import knowledgeAreasTableReducer from '../features/manage/tables/knowledge-areas-table/knowledgeAreasTableSlice';
import usersTableReducer from '../features/manage/tables/users-table/usersTableSlice';
import knowledgeAreasReducer from '../slices/knowledgeAreasSlice';
import subjectsReducer from '../slices/subjectsSlice';
import categoriesReducer from '../slices/categoriesSlice';
import userReducer from '../user/userSlice';
import subjectsTableReducer from '../features/manage/tables/subjects-table/subjectsTableSlice';
import categoriesTableReducer from '../features/manage/tables/categories-table/categoriesTableSlice';
import classesTableReducer from '../features/manage/tables/classes-table/classesTableSlice';
import signUpReducer from '../features/sign-up/signUpSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    knowledgeAreas: knowledgeAreasReducer,
    subjects: subjectsReducer,
    categories: categoriesReducer,
    usersTable: usersTableReducer,
    knowledgeAreasTable: knowledgeAreasTableReducer,
    subjectsTable: subjectsTableReducer,
    categoriesTable: categoriesTableReducer,
    classesTable: classesTableReducer,
    signUp: signUpReducer,
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
