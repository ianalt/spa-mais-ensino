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
  selected?: User;
  isCreating: boolean;
}

const initialState: UsersTableState = {
  status: 'idle',
  list: [],
  selected: undefined,
  isCreating: false,
};

export const usersTableSlice = createSlice({
  name: 'usersTable',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<User | undefined>) => {
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
      .addCase(createNewStudent.rejected, (state) => {
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewStudent.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'idle';

          const { list } = state;

          const newStudent = action.payload;

          state.list = [newStudent, ...list];
        }
      );

    builder
      .addCase(createNewMonitor.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewMonitor.rejected, (state) => {
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewMonitor.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'idle';

          const { list } = state;

          const newMonitor = action.payload;

          state.list = [newMonitor, ...list];
        }
      );

    builder
      .addCase(createNewTeacher.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewTeacher.rejected, (state) => {
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewTeacher.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'idle';

          const { list } = state;

          const newTeacher = action.payload;

          state.list = [newTeacher, ...list];
        }
      );

    builder
      .addCase(createNewAdmin.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewAdmin.rejected, (state) => {
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewAdmin.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'idle';

          const { list } = state;

          const newAdmin = action.payload;

          state.list = [newAdmin, ...list];
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
  async (body: CreateStudentBody) => {
    const response = await addNewStudent(body);
    const newStudent: User = response.data;

    return newStudent;
  }
);

export const createNewMonitor = createAsyncThunk(
  'usersTable/createNewMonitor',
  async (body: CreateMonitorBody) => {
    const response = await addNewMonitor(body);
    const newMonitor: User = response.data;

    return newMonitor;
  }
);

export const createNewTeacher = createAsyncThunk(
  'usersTable/createNewTeacher',
  async (body: CreateTeacherBody) => {
    const response = await addNewTeacher(body);
    const newTeacher: User = response.data;

    return newTeacher;
  }
);

export const createNewAdmin = createAsyncThunk(
  'usersTable/createNewAdmin',
  async (body: CreateAdminBody) => {
    const response = await addNewAdmin(body);
    const newAdmin: User = response.data;

    return newAdmin;
  }
);

export const { setSelected, setList } = usersTableSlice.actions;

export const selectUsersTable = (state: RootState) => state.usersTable;

export const getIsLoading = (state: RootState) => {
  const { status, isCreating } = state.usersTable;

  return status === 'loading' || isCreating;
};

export default usersTableSlice.reducer;
