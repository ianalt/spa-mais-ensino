import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Role } from '../utils/enums/role.enum';
import { User } from '../features/manage/tables/users-table/types/user';
import {
  changePassword,
  fetchProfile,
  updateProfile,
} from '../api/users/profile.req';
import { EditProfileBody } from '../features/profile/types/edit-profile.body';
import { ChangePasswordBody } from '../features/profile/types/change-password.body';

export interface BasicUserInfo {
  id: number;
  email: string;
  role: Role;
}

export interface UserState extends BasicUserInfo {
  profile: User | null;
  status: 'loading' | 'idle' | 'failed';
  loggedIn: boolean;
  error: any;
  isUpdating: boolean;
  isChangingPassword: boolean;
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
  id: 0,
  email: '',
  role: Role.USUARIO,
  loggedIn: false,
  error: null,
  isUpdating: false,
  isChangingPassword: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<BasicUserInfo>) => {
      const { id, email, role } = action.payload;
      state.id = id;
      state.email = email;
      state.role = role;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.id = initialState.id;
      state.email = initialState.email;
      state.role = initialState.role;
      state.loggedIn = initialState.loggedIn;
    },
    resetProfile: (state) => {
      state.profile = initialState.profile;
    },
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfile.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'idle';
        state.profile = action.payload;
      });

    builder
      .addCase(editProfile.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(editProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.profile = action.payload;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.role = action.payload.role;

        state.status = 'idle';
        state.isUpdating = false;
      });

    builder
      .addCase(passwordChange.pending, (state) => {
        state.status = 'loading';
        state.isChangingPassword = true;
      })
      .addCase(passwordChange.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isChangingPassword = false;
      })
      .addCase(passwordChange.fulfilled, (state) => {
        state.status = 'idle';
        state.isChangingPassword = false;
      });
  },
});

export const getProfile = createAsyncThunk('user/getProfile', async () => {
  const response = await fetchProfile();
  const user: User = response.data;

  return user;
});

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async (body: EditProfileBody, thunkAPI) => {
    try {
      const response = await updateProfile(body);

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

export const passwordChange = createAsyncThunk(
  'user/passwordChange',
  async (body: ChangePasswordBody, thunkAPI) => {
    try {
      await changePassword(body);
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

export const { login, logout, resetProfile, resetErrors } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const selectUserProfile = (state: RootState) => state.user.profile;

export const getIsMonitorOrTeacher = (state: RootState) => {
  const { profile } = state.user;

  return profile?.role === Role.MONITOR || profile?.role === Role.PROFESSOR;
};

export default userSlice.reducer;
