import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchCategory,
} from '../api/categories/categories.req';
import { createCategory } from '../api/categories/create-category.req';
import { deleteCategory } from '../api/categories/delete-category.req';
import { updateCategory } from '../api/categories/update-category.req';
import { RootState } from '../app/store';
import { AddCategoryBody } from '../features/manage/tables/categories-table/dialogs/add-category/types/add-category-body';
import { EditCategoryBody } from '../features/manage/tables/categories-table/dialogs/edit-category/types/edit-category-body';
import { Category } from '../features/manage/tables/categories-table/types/category';

export interface CategoriesState {
  status: 'idle' | 'loading' | 'failed';
  list: Category[];
  selectedCategory?: Category | null;
  error: any;
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
}

const initialState: CategoriesState = {
  status: 'idle',
  list: [],
  selectedCategory: null,
  error: null,
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
    },
    setList: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },

    resetSelected: (state) => {
      state.selectedCategory = initialState.selectedCategory;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategory.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = 'idle';
          state.selectedCategory = action.payload;
        }
      );

    builder
      .addCase(addNewCategory.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        addNewCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const { list } = state;

          const newCategory = action.payload;

          state.list = [newCategory, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );

    builder
      .addCase(editCategory.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(
        editCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const editedCategory = action.payload;

          const currentList = state.list.filter(
            (category) => category.id !== editedCategory.id
          );

          state.list = [editedCategory, ...currentList];

          state.status = 'idle';
          state.isUpdating = false;
        }
      );

    builder
      .addCase(removeCategory.pending, (state) => {
        state.status = 'loading';
        state.isRemoving = true;
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isRemoving = false;
      })
      .addCase(
        removeCategory.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.list = action.payload;
          state.status = 'idle';
          state.isRemoving = false;
        }
      );
  },
});

export const getCategory = createAsyncThunk(
  'categories/getCategory',
  async (id: number) => {
    const response = await fetchCategory(id);

    const category: Category = response.data;

    return category;
  }
);

export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (body: AddCategoryBody, thunkAPI) => {
    try {
      const response = await createCategory(body);

      return response.data;
    } catch (e: any) {
      if (e.isAxiosError) {
        if (typeof e.response.data.message === 'string') {
          const error = [e.response.data.message];

          return thunkAPI.rejectWithValue(error);
        }

        const errors = [...e.response.data.message].map((error: string) => {
          const afterDot = error.lastIndexOf('.') + 1;

          return error.substring(afterDot);
        });

        return thunkAPI.rejectWithValue(errors);
      }
    }
  }
);

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async (body: EditCategoryBody, thunkAPI) => {
    try {
      const response = await updateCategory(body);

      return response.data;
    } catch (e: any) {
      if (e.isAxiosError) {
        if (typeof e.response.data.message === 'string') {
          const error = [e.response.data.message];

          return thunkAPI.rejectWithValue(error);
        }

        const errors = [...e.response.data.message].map((error: string) => {
          const afterDot = error.lastIndexOf('.') + 1;

          return error.substring(afterDot);
        });

        return thunkAPI.rejectWithValue(errors);
      }
    }
  }
);

export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (categoryId: number, thunkAPI) => {
    try {
      await deleteCategory(categoryId);

      const response = await fetchCategories();

      return response.data;
    } catch (e: any) {
      if (e.isAxiosError) {
        if (typeof e.response.data.message === 'string') {
          const error = [e.response.data.message];

          return thunkAPI.rejectWithValue(error);
        }

        const errors = [...e.response.data.message].map((error: string) => {
          const afterDot = error.lastIndexOf('.') + 1;

          return error.substring(afterDot);
        });

        return thunkAPI.rejectWithValue(errors);
      }
    }
  }
);

export const { resetErrors, setList, resetSelected } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
