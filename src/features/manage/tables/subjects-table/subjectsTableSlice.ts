import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSubject } from '../../../../api/subjects/create-subject.req';
import { deleteSubject } from '../../../../api/subjects/delete-subject.req';
import {
  fetchCreateSubjectOptions,
  fetchSubjects,
  fetchUpdateSubjectOptions,
} from '../../../../api/subjects/subjects.req';
import { RootState } from '../../../../app/store';
import { AddSubjectBody } from './dialogs/add-subject/types/add-subject-body';
import { AddSubjectOptions } from './dialogs/add-subject/types/add-subject-options';
import { EditSubjectOptions } from './dialogs/edit-subject/types/edit-subject-options';
import { KnowledgeAreaOption } from './types/knowledge-area-option';
import { MonitorOption } from './types/monitor-option';
import { Subject } from './types/subject';
import { TeacherOption } from './types/teacher-option';

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

    builder
      .addCase(addNewSubject.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(addNewSubject.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        addNewSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          const { list } = state;

          const newSubject = action.payload;

          state.list = [newSubject, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );

    builder
      .addCase(getEditSubjectOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEditSubjectOptions.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getEditSubjectOptions.fulfilled,
        (state, action: PayloadAction<EditSubjectOptions>) => {
          const { knowledgeAreasList, teachersList, monitorsList } =
            action.payload;

          state.status = 'idle';
          state.knowledgeAreasList = knowledgeAreasList;
          state.teachersList = teachersList;
          state.monitorsList = monitorsList;
        }
      );

    builder
      .addCase(removeSubject.pending, (state) => {
        state.status = 'loading';
        state.isRemoving = true;
      })
      .addCase(removeSubject.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isRemoving = false;
      })
      .addCase(
        removeSubject.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.list = action.payload;
          state.status = 'idle';
          state.isRemoving = false;
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

export const addNewSubject = createAsyncThunk(
  'subjectsTable/addNewSubject',
  async (body: AddSubjectBody, thunkAPI) => {
    try {
      const response = await createSubject(body);

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

export const getEditSubjectOptions = createAsyncThunk(
  'subjectsTable/getEditSubjectOptions',
  async (subjectId: number) => {
    const res = await fetchUpdateSubjectOptions(subjectId);

    const options: EditSubjectOptions = {
      knowledgeAreasList: res.data.knowledgeAreaOptions,
      teachersList: res.data.teacherOptions,
      monitorsList: res.data.monitorsOptions,
    };

    return options;
  }
);

export const removeSubject = createAsyncThunk(
  'subjectsTable/removeSubject',
  async (subjectId: number, thunkAPI) => {
    try {
      await deleteSubject(subjectId);

      const response = await fetchSubjects();

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

export const { setSelected, setList, resetSelected, resetErrors } =
  subjectsTableSlice.actions;

export const selectSubjectsTable = (state: RootState) => state.subjectsTable;

export default subjectsTableSlice.reducer;
