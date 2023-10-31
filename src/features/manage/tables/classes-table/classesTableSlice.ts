import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchClasses } from '../../../../api/classes/classes.req';
import { RootState } from '../../../../app/store';
import { Classes } from './types/classes';

export interface ClassesTableState {
  status: 'idle' | 'loading' | 'failed';
  list: Classes[];
  selected: Classes | null;
}

const initialState: ClassesTableState = {
  status: 'idle',
  list: [],
  selected: null,
};

export const classesTableSlice = createSlice({
  name: 'classesTable',
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
      .addCase(getClassesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClassesList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getClassesList.fulfilled,
        (state, action: PayloadAction<Classes[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );
  },
});

export const getClassesList = createAsyncThunk(
  'classesTable/getClassesList',
  async () => {
    const response = await fetchClasses();
    const classes: Classes[] = response.data;

    return classes;
  }
);

export const { setSelected, setList, resetSelected } =
  classesTableSlice.actions;

export const selectClassesTable = (state: RootState) => state.classesTable;

export const getIsLoading = (state: RootState) => {
  const { status } = state.classesTable;

  return status === 'loading';
};

export default classesTableSlice.reducer;
