import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from '../../../../api/categories/categories.req';
import { RootState } from '../../../../app/store';
import { Category } from './types/category';

export interface CategoriesTableState {
  status: 'idle' | 'loading' | 'failed';
  list: Category[];
  selected?: Category;
}

const initialState: CategoriesTableState = {
  status: 'idle',
  list: [],
  selected: undefined,
};

export const categoriesTableSlice = createSlice({
  name: 'categoriesTable',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Category | undefined>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoriesList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getCategoriesList.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );
  },
});

export const getCategoriesList = createAsyncThunk(
  'categoriesTable/getCategories',
  async () => {
    const response = await fetchCategories();
    const categories: Category[] = response.data;

    return categories;
  }
);

export const { setSelected, setList } = categoriesTableSlice.actions;

export const selectCategoriesTable = (state: RootState) =>
  state.categoriesTable;

export default categoriesTableSlice.reducer;
