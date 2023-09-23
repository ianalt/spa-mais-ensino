import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchKnowledgeAreasWelcome } from '../api/knowledge-areas/knowledge-areas.req';
import { RootState } from '../app/store';
import { Category } from '../features/manage/tables/categories-table/types/category';

export interface CategoriesState {
  status: 'idle' | 'loading' | 'failed';
  list: Category[];
  selectedCategory?: Category | null;
}

const initialState: CategoriesState = {
  status: 'idle',
  list: [],
  selectedCategory: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherOrMonitorCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTeacherOrMonitorCategory.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getTeacherOrMonitorCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = 'idle';
          state.selectedCategory = action.payload;
        }
      );
  },
});

export const getCategory = createAsyncThunk(
  'categories/getCategory',
  async () => {
    const response = await fetchCategory();
    const category: Category = response.data;

    return category;
  }
);

export const {} = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
