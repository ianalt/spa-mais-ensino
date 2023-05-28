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
import { removeUser } from '../../../../api/users/remove-user.req';
import { UpdateTeacherBody } from './dialogs/edit-user/types/update-teacher-body';
import { UpdateMonitorBody } from './dialogs/edit-user/types/update-monitor-body';
import { UpdateStudentBody } from './dialogs/edit-user/types/update-student-body';
import {
  updateAdmin,
  updateMonitor,
  updateStudent,
  updateTeacher,
} from '../../../../api/users/update-users.req';
import { UpdateAdminBody } from './dialogs/edit-user/types/update-admin-body';
import {
  fetchEthnicityStats,
  fetchGenderStats,
} from '../../../../api/users/stats.req';

export interface UsersTableState {
  status: 'idle' | 'loading' | 'failed';
  list: User[];
  selected: User | null;
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  error: any;
  ethnicityStats: {
    name: string;
    count: number;
  }[];
  genderStats: {
    name: string;
    count: number;
  }[];
}

const initialState: UsersTableState = {
  status: 'idle',
  list: [],
  selected: null,
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
  error: null,
  ethnicityStats: [],
  genderStats: [],
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
      .addCase(editStudent.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(editStudent.fulfilled, (state, action: PayloadAction<User>) => {
        const editedStudent = action.payload;

        const currentList = state.list.filter(
          (user) => user.id !== editedStudent.id
        );

        state.list = [editedStudent, ...currentList];

        state.status = 'idle';
        state.isUpdating = false;
      });

    builder
      .addCase(editMonitor.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editMonitor.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(editMonitor.fulfilled, (state, action: PayloadAction<User>) => {
        const editedMonitor = action.payload;

        const currentList = state.list.filter(
          (user) => user.id !== editedMonitor.id
        );

        state.list = [editedMonitor, ...currentList];

        state.status = 'idle';
        state.isUpdating = false;
      });

    builder
      .addCase(editTeacher.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editTeacher.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(editTeacher.fulfilled, (state, action: PayloadAction<User>) => {
        const editedTeacher = action.payload;

        const currentList = state.list.filter(
          (user) => user.id !== editedTeacher.id
        );

        state.list = [editedTeacher, ...currentList];

        state.status = 'idle';
        state.isUpdating = false;
      });

    builder
      .addCase(editAdmin.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(editAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        const editedAdmin = action.payload;

        const currentList = state.list.filter(
          (user) => user.id !== editedAdmin.id
        );

        state.list = [editedAdmin, ...currentList];

        state.status = 'idle';
        state.isUpdating = false;
      });

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

    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
        state.isRemoving = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isRemoving = false;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.list = action.payload;
        state.status = 'idle';
        state.isRemoving = false;
      });

    //TODO n me parece certo
    builder
      .addCase(getEthnicityStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEthnicityStats.rejected, (state) => {
        state.ethnicityStats = initialState.ethnicityStats;
        state.status = 'idle';
      })
      .addCase(
        getEthnicityStats.fulfilled,
        (state, action: PayloadAction<{ name: string; count: number }[]>) => {
          state.ethnicityStats = action.payload;
          state.status = 'idle';
        }
      );

    builder
      .addCase(getGenderStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGenderStats.rejected, (state) => {
        state.genderStats = initialState.ethnicityStats;
        state.status = 'idle';
      })
      .addCase(
        getGenderStats.fulfilled,
        (state, action: PayloadAction<{ name: string; count: number }[]>) => {
          state.genderStats = action.payload;
          state.status = 'idle';
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

export const deleteUser = createAsyncThunk(
  'usersTable/deleteUser',
  async (userId: number, thunkAPI) => {
    try {
      await removeUser(userId);

      const response = await fetchUsers();

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

export const editStudent = createAsyncThunk(
  'usersTable/editStudent',
  async (body: UpdateStudentBody, thunkAPI) => {
    try {
      const response = await updateStudent(body);

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

export const editMonitor = createAsyncThunk(
  'usersTable/editMonitor',
  async (body: UpdateMonitorBody, thunkAPI) => {
    try {
      const response = await updateMonitor(body);

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

export const editTeacher = createAsyncThunk(
  'usersTable/editTeacher',
  async (body: UpdateTeacherBody, thunkAPI) => {
    try {
      const response = await updateTeacher(body);

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

export const editAdmin = createAsyncThunk(
  'usersTable/editAdmin',
  async (body: UpdateAdminBody, thunkAPI) => {
    try {
      const response = await updateAdmin(body);

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

export const getEthnicityStats = createAsyncThunk(
  'usersTable/getEthnicityStats',
  async () => {
    const response = await fetchEthnicityStats();
    return response.data;
  }
);

export const getGenderStats = createAsyncThunk(
  'usersTable/getGenderStats',
  async () => {
    const response = await fetchGenderStats();
    return response.data;
  }
);

export const { resetSelected, resetErrors, setSelected, setList } =
  usersTableSlice.actions;

export const selectUsersTable = (state: RootState) => state.usersTable;

export const getIsLoading = (state: RootState) => {
  const { status, isCreating, isRemoving, isUpdating } = state.usersTable;

  return status === 'loading' || isCreating || isRemoving || isUpdating;
};

export const getIsMonitorOrTeacher = (state: RootState) => {
  const { selected } = state.usersTable;

  return selected?.role === 'monitor' || selected?.role === 'professor';
};

export const getStudentsEthnicityStats = (state: RootState) => {
  const { ethnicityStats } = state.usersTable;

  return ethnicityStats;
};

export const getStudentsGenderStats = (state: RootState) => {
  const { genderStats } = state.usersTable;

  return genderStats;
};

export default usersTableSlice.reducer;
