import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../user/userSlice";
import knowledgeAreasReducer from "../slices/knowledgeAreasSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    knowledgeAreas: knowledgeAreasReducer,
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
