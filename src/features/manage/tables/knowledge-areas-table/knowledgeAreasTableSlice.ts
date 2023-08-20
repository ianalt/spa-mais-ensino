import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchKnowledgeAreas } from '../../../../api/knowledge-areas/knowledge-areas.req';
import { RootState } from '../../../../app/store';
import { KnowledgeArea } from '../../../../slices/knowledgeAreasSlice';
import { CreateKnowledgeAreaBody } from './dialogs/create-knowledge-area/types/create-knowledge-area-body';
import { addNewKnowledgeArea } from '../../../../api/knowledge-areas/create-knowledge-area.req';
import { removeKnowledgeArea } from '../../../../api/knowledge-areas/remove-knowledge-area.req';
import { updateKnowledgeArea } from '../../../../api/knowledge-areas/update-knowledge-area.req';
import { UpdateKnowledgeAreaBody } from './dialogs/edit-knowledge-area/types/update-knowledge-area-body';

export interface KnowledgeAreasTableState {
  status: 'idle' | 'loading' | 'failed';
  list: KnowledgeArea[];
  selected: KnowledgeArea | null;
  error: any;
  isCreating: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
}

const initialState: KnowledgeAreasTableState = {
  status: 'idle',
  list: [],
  selected: null,
  error: null,
  isCreating: false,
  isRemoving: false,
  isUpdating: false,
};

export const knowledgeAreasTableSlice = createSlice({
  name: 'knowledgeAreasTable',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.status = 'idle';
      state.error = initialState.error;
    },
    setSelected: (state, action: PayloadAction<KnowledgeArea | null>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<KnowledgeArea[]>) => {
      state.list = action.payload;
    },
    resetSelected: (state) => {
      state.selected = initialState.selected;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKnowledgeAreasList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getKnowledgeAreasList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getKnowledgeAreasList.fulfilled,
        (state, action: PayloadAction<KnowledgeArea[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );

    builder
      .addCase(createNewKnowledgeArea.pending, (state) => {
        state.status = 'loading';
        state.isCreating = true;
      })
      .addCase(createNewKnowledgeArea.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isCreating = false;
      })
      .addCase(
        createNewKnowledgeArea.fulfilled,
        (state, action: PayloadAction<KnowledgeArea>) => {
          const { list } = state;

          const newKnowledgeArea = action.payload;

          state.list = [newKnowledgeArea, ...list];

          state.status = 'idle';
          state.isCreating = false;
        }
      );

    builder
      .addCase(deleteKnowledgeArea.pending, (state) => {
        state.status = 'loading';
        state.isRemoving = true;
      })
      .addCase(deleteKnowledgeArea.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isRemoving = false;
      })
      .addCase(
        deleteKnowledgeArea.fulfilled,
        (state, action: PayloadAction<KnowledgeArea[]>) => {
          state.list = action.payload;
          state.status = 'idle';
          state.isRemoving = false;
        }
      );

    builder
      .addCase(editKnowledgeArea.pending, (state) => {
        state.status = 'loading';
        state.isUpdating = true;
      })
      .addCase(editKnowledgeArea.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isUpdating = false;
      })
      .addCase(
        editKnowledgeArea.fulfilled,
        (state, action: PayloadAction<KnowledgeArea>) => {
          const editedKnowledgeArea = action.payload;

          const currentList = state.list.filter(
            (knowledgeArea) => knowledgeArea.id !== editedKnowledgeArea.id
          );

          state.list = [editedKnowledgeArea, ...currentList];

          state.status = 'idle';
          state.isUpdating = false;
        }
      );
  },
});

export const getKnowledgeAreasList = createAsyncThunk(
  'knowledgeAreasTable/getKnowledgeAreas',
  async () => {
    const response = await fetchKnowledgeAreas();
    const knowledgeAreas: KnowledgeArea[] = response.data;

    return knowledgeAreas;
  }
);

export const createNewKnowledgeArea = createAsyncThunk(
  'knowledgeAreasTable/createNewKnowledgeArea',
  async (body: CreateKnowledgeAreaBody, thunkAPI) => {
    try {
      const response = await addNewKnowledgeArea(body);

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

export const deleteKnowledgeArea = createAsyncThunk(
  'knowledgeAreasTable/deleteKnowledgeArea',
  async (userId: number, thunkAPI) => {
    try {
      await removeKnowledgeArea(userId);

      const response = await fetchKnowledgeAreas();

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

export const editKnowledgeArea = createAsyncThunk(
  'knowledgeAreasTable/editKnowledgeArea',
  async (body: UpdateKnowledgeAreaBody, thunkAPI) => {
    try {
      const response = await updateKnowledgeArea(body);

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

export const { resetErrors, setSelected, setList, resetSelected } =
  knowledgeAreasTableSlice.actions;

export const selectKnowledgeAreasTable = (state: RootState) =>
  state.knowledgeAreasTable;

export const getIsLoading = (state: RootState) => {
  const { status, isCreating, isRemoving, isUpdating } =
    state.knowledgeAreasTable;

  return status === 'loading' || isCreating || isRemoving || isUpdating;
};

export default knowledgeAreasTableSlice.reducer;
