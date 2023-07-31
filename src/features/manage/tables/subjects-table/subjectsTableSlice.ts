import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSubjects } from '../../../../api/subjects/subjects.req';
import { RootState } from '../../../../app/store';
import { Subject } from './types/subject';

export interface SubjectsTableState {
  status: 'idle' | 'loading' | 'failed';
  list: Subject[];
  selected: Subject | null;
  error: any;
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
}

const initialState: SubjectsTableState = {
  status: 'idle',
  list: [],
  selected: null,
  error: null,
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
};

export const subjectsTableSlice = createSlice({
  name: 'subjectsTable',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
    },
    setSelected: (state, action: PayloadAction<Subject | null>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<Subject[]>) => {
      state.list = action.payload;
    },
    resetSelected: (state) => {
      state.selected = initialState.selected;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjectsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubjectsList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getSubjectsList.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );
  },
});

export const getSubjectsList = createAsyncThunk(
  'subjectsTable/getSubjects',
  async () => {
    const response = await fetchSubjects();
    const subjects: Subject[] = response.data;

    return subjects;
  }
);

export const { setSelected, setList, resetSelected, resetErrors } =
  subjectsTableSlice.actions;

export const selectSubjectsTable = (state: RootState) => state.subjectsTable;

export default subjectsTableSlice.reducer;
