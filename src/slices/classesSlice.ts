import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Classes } from '../features/manage/tables/classes-table/types/classes';
import { fetchClassOptions } from '../api/classes/class-options.req';
import {
  ClassOptions,
  SubjectWithCategories,
} from '../features/create-class/types/class-options';

export interface ClassesState {
  status: 'idle' | 'loading' | 'failed';
  list: Classes[];
  selected: Classes | null;
  subjectsList: SubjectWithCategories[];
}

const initialState: ClassesState = {
  status: 'idle',
  list: [],
  selected: null,
  subjectsList: [],
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Classes | null>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<Classes[]>) => {
      state.list = action.payload;
    },
    resetSelected: (state) => {
      state.selected = initialState.selected;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClassOptions.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getClassOptions.fulfilled,
        (state, action: PayloadAction<ClassOptions>) => {
          const { subjects } = action.payload;

          state.status = 'idle';
          state.subjectsList = subjects;
        }
      );
  },
});

export const getClassOptions = createAsyncThunk(
  'classes/getClassOptions',
  async () => {
    const response = await fetchClassOptions();
    const classOptions: ClassOptions = response.data;

    return classOptions;
  }
);

export const { setSelected, setList, resetSelected } = classesSlice.actions;

export const selectClasses = (state: RootState) => state.classes;

export const selectSubjectOptionsForClass = (state: RootState) =>
  state.classes.subjectsList;

export const getIsLoading = (state: RootState) => {
  const { status } = state.classesTable;

  return status === 'loading';
};

export default classesSlice.reducer;
