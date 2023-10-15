import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTeacherOrMonitorSubject } from '../api/subjects/subjects.req';
import { RootState } from '../app/store';
import { Subject } from '../features/manage/tables/subjects-table/types/subject';

export interface SubjectsState {
  status: 'idle' | 'loading' | 'failed';
  list: Subject[];
  selectedSubject?: Subject | null;
}

const initialState: SubjectsState = {
  status: 'idle',
  list: [],
  selectedSubject: null,
};

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherOrMonitorSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTeacherOrMonitorSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getTeacherOrMonitorSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.status = 'idle';
          state.selectedSubject = action.payload;
        }
      );
  },
});

export const getTeacherOrMonitorSubject = createAsyncThunk(
  'subjects/getTeacherOrMonitorSubject',
  async () => {
    const response = await fetchTeacherOrMonitorSubject();
    const subject: Subject = response.data;

    return subject;
  }
);

export const { resetErrors } = subjectsSlice.actions;

export const selectSubjects = (state: RootState) => state.subjects;

export default subjectsSlice.reducer;
