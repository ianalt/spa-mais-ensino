import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchCategoryOptions,
} from '../../../../api/categories/categories.req';
import { createCategory } from '../../../../api/categories/create-category.req';
import { deleteCategory } from '../../../../api/categories/delete-category.req';
import { updateCategory } from '../../../../api/categories/update-category.req';
import { RootState } from '../../../../app/store';
import { AddCategoryBody } from './dialogs/add-category/types/add-category-body';
import { EditCategoryBody } from './dialogs/edit-category/types/edit-category-body';
import { CategoryOptions } from './dialogs/types/category-options';
import { SubjectOption } from './dialogs/types/subject-option';
import { Category } from './dialogs/types/category';

export interface CategoriesTableState {
  status: 'idle' | 'loading' | 'failed';
  list: Category[];
  selected: Category | null;
  error: any;
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  subjectsList: SubjectOption[];
}

const initialState: CategoriesTableState = {
  status: 'idle',
  list: [],
  selected: null,
  error: null,
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
  subjectsList: [],
};

export const categoriesTableSlice = createSlice({
  name: 'categoriesTable',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
    },
    setSelected: (state, action: PayloadAction<Category | null>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
    resetSelected: (state) => {
      state.selected = initialState.selected;
      state.status = initialState.status;
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

    builder
      .addCase(getCategoryOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoryOptions.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getCategoryOptions.fulfilled,
        (state, action: PayloadAction<CategoryOptions>) => {
          const { subjectOptions } = action.payload;

          state.status = 'idle';
          state.subjectsList = subjectOptions;
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

export const getCategoriesList = createAsyncThunk(
  'categoriesTable/getCategories',
  async () => {
    const response = await fetchCategories();
    const categories: Category[] = response.data;

    return categories;
  }
);

export const getCategoryOptions = createAsyncThunk(
  'categoriesTable/getCategoryOptions',
  async () => {
    const res = await fetchCategoryOptions();

    const options: CategoryOptions = {
      subjectOptions: res.data.subjectOptions,
    };

    return options;
  }
);

export const addNewCategory = createAsyncThunk(
  'categoriesTable/addNewCategory',
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
  'categoriesTable/editCategory',
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
  'categoriesTable/removeCategory',
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

export const { resetErrors, setSelected, setList, resetSelected } =
  categoriesTableSlice.actions;

export const selectCategoriesTable = (state: RootState) =>
  state.categoriesTable;

export const getIsLoading = (state: RootState) => {
  const { status, isCreating, isRemoving, isUpdating } = state.categoriesTable;

  return status === 'loading' || isCreating || isRemoving || isUpdating;
};

export default categoriesTableSlice.reducer;
