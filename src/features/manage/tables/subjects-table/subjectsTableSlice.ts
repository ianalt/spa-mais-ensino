import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCreateSubjectOptions,
  fetchSubjects,
} from '../../../../api/subjects/subjects.req';
import { RootState } from '../../../../app/store';
import { AddSubjectOptions } from './dialogs/add-subject/types/add-subject-options';
import { KnowledgeAreaOption } from './dialogs/add-subject/types/knowledge-area-option';
import { MonitorOption } from './dialogs/add-subject/types/monitor-option';
import { TeacherOption } from './dialogs/add-subject/types/teacher-option';
import { Subject } from './types/subject';

export interface SubjectsTableState {
  status: 'idle' | 'loading' | 'failed';
  list: Subject[];
  selected: Subject | null;
  error: any;
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  knowledgeAreasList: KnowledgeAreaOption[];
  teachersList: TeacherOption[];
  monitorsList: MonitorOption[];
}

const initialState: SubjectsTableState = {
  status: 'idle',
  list: [],
  selected: null,
  error: null,
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
  knowledgeAreasList: [],
  teachersList: [],
  monitorsList: [],
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

    builder
      .addCase(getAddSubjectOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAddSubjectOptions.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getAddSubjectOptions.fulfilled,
        (state, action: PayloadAction<AddSubjectOptions>) => {
          const { knowledgeAreasList, teachersList, monitorsList } =
            action.payload;

          state.status = 'idle';
          state.knowledgeAreasList = knowledgeAreasList;
          state.teachersList = teachersList;
          state.monitorsList = monitorsList;
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

export const getAddSubjectOptions = createAsyncThunk(
  'subjectsTable/getAddSubjectOptions',
  async () => {
    const res = await fetchCreateSubjectOptions();

    const options: AddSubjectOptions = {
      knowledgeAreasList: res.data.knowledgeAreaOptions,
      teachersList: res.data.teacherOptions,
      monitorsList: res.data.monitorsOptions,
    };

    return options;
  }
);

export const { setSelected, setList, resetSelected, resetErrors } =
  subjectsTableSlice.actions;

export const selectSubjectsTable = (state: RootState) => state.subjectsTable;

export default subjectsTableSlice.reducer;
