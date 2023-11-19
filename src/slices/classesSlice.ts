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
import {
  fetchClass,
  fetchClasses,
  fetchClassesFromSubject,
} from '../api/classes/classes.req';
import { deleteClass } from '../api/classes/delete-class.req';
import { EditClassTitleBody } from '../features/access-class/types/edit-class-title-body';
import {
  removeClassExtraFiles,
  updateClassCategory,
  updateClassExtraFiles,
  updateClassTitle,
  updateClassVideo,
} from '../api/classes/update-class.req';
import { EditClassCategoryBody } from '../features/access-class/types/edit-class-category-body';
import { EditClassVideoBody } from '../features/access-class/types/edit-class-video-body';
import { EditClassExtraFilesBody } from '../features/access-class/types/edit-class-extra-files-body';

export interface ClassesState {
  status: 'idle' | 'loading' | 'failed';
  list: Classes[];
  selected: Classes | null;
  subjectsList: SubjectWithCategories[];
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  error: any;
}

const initialState: ClassesState = {
  status: 'idle',
  list: [],
  selected: null,
  subjectsList: [],
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
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
      .addCase(getClassesFromSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClassesFromSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getClassesFromSubject.fulfilled,
        (state, action: PayloadAction<Classes[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );

    builder
      .addCase(getClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClass.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getClass.fulfilled, (state, action: PayloadAction<Classes>) => {
        state.status = 'idle';
        state.selected = action.payload;
      });

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

    builder
      .addCase(removeClass.pending, (state) => {
        state.status = 'loading';
        state.isRemoving = true;
      })
      .addCase(removeClass.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isRemoving = false;
      })
      .addCase(
        removeClass.fulfilled,
        (state, action: PayloadAction<Classes[]>) => {
          state.list = action.payload;
          state.status = 'idle';
          state.isRemoving = false;
        }
      );

    //TODO SET CASES
    builder
      .addCase(editClassTitle.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editClassTitle.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(
        editClassTitle.fulfilled,
        (state, action: PayloadAction<Classes>) => {
          state.selected = action.payload;
          state.status = 'idle';
          state.isUpdating = false;
        }
      );

    builder
      .addCase(editClassCategory.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editClassCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(
        editClassCategory.fulfilled,
        (state, action: PayloadAction<Classes>) => {
          state.selected = action.payload;
          state.status = 'idle';
          state.isUpdating = false;
        }
      );

    builder
      .addCase(editClassVideo.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editClassVideo.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(
        editClassVideo.fulfilled,
        (state, action: PayloadAction<Classes>) => {
          state.selected = action.payload;
          state.status = 'idle';
          state.isUpdating = false;
        }
      );

    builder
      .addCase(editClassExtraFiles.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editClassExtraFiles.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(
        editClassExtraFiles.fulfilled,
        (state, action: PayloadAction<Classes>) => {
          state.selected = action.payload;
          state.status = 'idle';
          state.isUpdating = false;
        }
      );
  },
});

export const getClassesFromSubject = createAsyncThunk(
  'classes/getClasses',
  async (subjectId: number) => {
    const response = await fetchClassesFromSubject(subjectId);
    const classes: Classes[] = response.data;

    return classes;
  }
);

export const getClassOptions = createAsyncThunk(
  'classes/getClassOptions',
  async () => {
    const response = await fetchClassOptions();
    const classOptions: ClassOptions = response.data;

    return classOptions;
  }
);

export const getClass = createAsyncThunk(
  'classes/getClass',
  async (id: number) => {
    const response = await fetchClass(id);

    const foundClass: Classes = response.data;

    return foundClass;
  }
);

export const createNewClass = createAsyncThunk(
  'classes/createNewClass',
  async (body: CreateClassBody, thunkAPI) => {
    try {
      const newClassResponse = await createClass(body);

      const newClass: Classes = newClassResponse.data;

      await createVideoClassFile(body.videoClassFile, newClass.id);

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

export const editClassTitle = createAsyncThunk(
  'classes/editClassTitle',
  async (body: EditClassTitleBody, thunkAPI) => {
    try {
      const updatedClassResponse = await updateClassTitle(body);

      return updatedClassResponse.data;
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

export const editClassCategory = createAsyncThunk(
  'classes/editClassCategory',
  async (body: EditClassCategoryBody, thunkAPI) => {
    try {
      const updatedClassResponse = await updateClassCategory(body);

      return updatedClassResponse.data;
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

export const editClassVideo = createAsyncThunk(
  'classes/editClassVideo',
  async (body: EditClassVideoBody, thunkAPI) => {
    try {
      const updatedClassResponse = await updateClassVideo(body);

      return updatedClassResponse.data;
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

export const editClassExtraFiles = createAsyncThunk(
  'classes/editClassExtraFiles',
  async (body: EditClassExtraFilesBody, thunkAPI) => {
    try {
      if (body.extraFiles !== null) {
        const { classId, extraFiles } = body;
        const updatedClassResponse = await updateClassExtraFiles(
          classId,
          extraFiles
        );
        return updatedClassResponse.data;
      }

      const updatedClassResponse = await removeClassExtraFiles(body.classId);
      return updatedClassResponse.data;
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

export const removeClass = createAsyncThunk(
  'classes/removeClass',
  async (classId: number, thunkAPI) => {
    try {
      await deleteClass(classId);

      const response = await fetchClasses();

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
  classesSlice.actions;

export const selectClasses = (state: RootState) => state.classes;

export const selectSubjectOptionsForClass = (state: RootState) =>
  state.classes.subjectsList;

export const getIsLoading = (state: RootState) => {
  const { status } = state.classesTable;

  return status === 'loading';
};

export default classesSlice.reducer;
