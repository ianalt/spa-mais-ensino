import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Classes } from '../features/manage/tables/classes-table/types/classes';
import { fetchClassOptions } from '../api/classes/class-options.req';
import {
  ClassOptions,
  SubjectWithCategories,
} from '../features/create-class/types/class-options';
import { CreateClassBody } from '../features/manage/tables/classes-table/types/create-class-body';
import { createClass } from '../api/classes/create-class.req';
import { createVideoClassFile } from '../api/classes/create-video-class-file.req';
import { createExtraClassFiles } from '../api/classes/create-extra-class-files.req';
import { fetchClass } from '../api/classes/classes.req';

export interface ClassesState {
  status: 'idle' | 'loading' | 'failed';
  list: Classes[];
  selected: Classes | null;
  subjectsList: SubjectWithCategories[];
  isCreating: boolean;
  error: any;
}

const initialState: ClassesState = {
  status: 'idle',
  list: [],
  selected: null,
  subjectsList: [],
  isCreating: false,
  error: null,
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
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
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

    builder
      .addCase(createNewClass.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewClass.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewClass.fulfilled,
        (state, action: PayloadAction<Classes>) => {
          const newClass = action.payload;

          state.selected = newClass;
          state.status = 'idle';
          state.isCreating = false;
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

export const createNewClass = createAsyncThunk(
  'classes/createNewClass',
  async (body: CreateClassBody, thunkAPI) => {
    try {
      //TODO criar aula. se der certo, cria arquivos
      const newClassResponse = await createClass(body);

      //TODO se der erro na aula, taca erro
      const newClass: Classes = newClassResponse.data;

      //TODO se criar aula, mas der erro no arquivo, deleta aula e arquivos
      await createVideoClassFile(body.videoClassFile, newClass.id);

      //TODO se não tiver extraFiles, n faz request
      if (body.extraFiles) {
        await createExtraClassFiles(body.extraFiles, newClass.id);
      }

      const foundClassResponse = await fetchClass(newClass.id);

      return foundClassResponse.data;
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
  classesSlice.actions;

export const selectClasses = (state: RootState) => state.classes;

export const selectSubjectOptionsForClass = (state: RootState) =>
  state.classes.subjectsList;

export const getIsLoading = (state: RootState) => {
  const { status } = state.classesTable;

  return status === 'loading';
};

export default classesSlice.reducer;
