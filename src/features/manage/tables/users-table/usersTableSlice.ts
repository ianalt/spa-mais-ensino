import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addNewAdmin,
  addNewMonitor,
  addNewStudent,
  addNewTeacher,
} from '../../../../api/users/create-users.req';
import { fetchUsers } from '../../../../api/users/login';
import { RootState } from '../../../../app/store';
import { CreateAdminBody } from './dialogs/create-user/types/create-admin-body';
import { CreateMonitorBody } from './dialogs/create-user/types/create-monitor-body';
import { CreateStudentBody } from './dialogs/create-user/types/create-student-body';
import { CreateTeacherBody } from './dialogs/create-user/types/create-teacher-body';
import { User } from './types/user';

export interface UsersTableState {
  status: 'idle' | 'loading' | 'failed';
  list: User[];
  selected: User | null;
  isCreating: boolean;
  error: any;
}

const initialState: UsersTableState = {
  status: 'idle',
  list: [],
  selected: null,
  isCreating: false,
  error: null,
};

export const usersTableSlice = createSlice({
  name: 'usersTable',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
    },
    resetSelected: (state) => {
      state.selected = initialState.selected;
      state.status = initialState.status;
    },
    setSelected: (state, action: PayloadAction<User | null>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getUsersList.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );

    builder
      .addCase(createNewStudent.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewStudent.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewStudent.fulfilled,
        (state, action: PayloadAction<User>) => {
          const { list } = state;

          const newStudent = action.payload;

          state.list = [newStudent, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );

    builder
      .addCase(createNewMonitor.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewMonitor.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewMonitor.fulfilled,
        (state, action: PayloadAction<User>) => {
          const { list } = state;

          const newMonitor = action.payload;

          state.list = [newMonitor, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );

    builder
      .addCase(createNewTeacher.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewTeacher.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewTeacher.fulfilled,
        (state, action: PayloadAction<User>) => {
          const { list } = state;

          const newTeacher = action.payload;

          state.list = [newTeacher, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );

    builder
      .addCase(createNewAdmin.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewAdmin.fulfilled,
        (state, action: PayloadAction<User>) => {
          const { list } = state;

          const newAdmin = action.payload;

          state.list = [newAdmin, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );
  },
});

export const getUsersList = createAsyncThunk(
  'usersTable/getUsers',
  async () => {
    const response = await fetchUsers();
    const users: User[] = response.data;

    return users;
  }
);

//TODO integrate API
export const createNewStudent = createAsyncThunk(
  'usersTable/createNewStudent',
  async (body: CreateStudentBody, thunkAPI) => {
    try {
      const response = await addNewStudent(body);

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

export const createNewMonitor = createAsyncThunk(
  'usersTable/createNewMonitor',
  async (body: CreateMonitorBody, thunkAPI) => {
    try {
      const response = await addNewMonitor(body);

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

export const createNewTeacher = createAsyncThunk(
  'usersTable/createNewTeacher',
  async (body: CreateTeacherBody, thunkAPI) => {
    try {
      const response = await addNewTeacher(body);
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

export const createNewAdmin = createAsyncThunk(
  'usersTable/createNewAdmin',
  async (body: CreateAdminBody, thunkAPI) => {
    try {
      const response = await addNewAdmin(body);
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

export const { resetSelected, resetErrors, setSelected, setList } =
  usersTableSlice.actions;

export const selectUsersTable = (state: RootState) => state.usersTable;

export const getIsLoading = (state: RootState) => {
  const { status, isCreating } = state.usersTable;

  return status === 'loading' || isCreating;
};

export const getIsMonitorOrTeacher = (state: RootState) => {
  const { selected } = state.usersTable;

  return selected?.role === 'monitor' || selected?.role === 'professor';
};

export default usersTableSlice.reducer;
