import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchSubject,
  fetchTeacherOrMonitorSubject,
} from '../api/subjects/subjects.req';
import { RootState } from '../app/store';
import {
  FullSubjectInfo,
  Subject,
} from '../features/manage/tables/subjects-table/types/subject';

export interface SubjectsState {
  status: 'idle' | 'loading' | 'failed';
  list: Subject[];
  selectedSubject?: Subject | null;
  openedSubject: FullSubjectInfo | null;
}

const initialState: SubjectsState = {
  status: 'idle',
  list: [],
  selectedSubject: null,
  openedSubject: null,
};

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = initialState.status;
    },

    resetSubject: (state) => {
      state.selectedSubject = initialState.selectedSubject;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getSubject.fulfilled,
        (state, action: PayloadAction<FullSubjectInfo>) => {
          state.status = 'idle';
          state.openedSubject = action.payload;
        }
      );

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

export const getSubject = createAsyncThunk(
  'subjects/getSubject',
  async (id: number) => {
    const response = await fetchSubject(id);

    return response.data;
  }
);

export const getTeacherOrMonitorSubject = createAsyncThunk(
  'subjects/getTeacherOrMonitorSubject',
  async () => {
    const response = await fetchTeacherOrMonitorSubject();
    const subject: Subject = response.data;

    return subject;
  }
);

export const { resetErrors, resetSubject } = subjectsSlice.actions;

export const selectSubjects = (state: RootState) => state.subjects;

export default subjectsSlice.reducer;
