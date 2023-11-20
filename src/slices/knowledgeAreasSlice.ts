import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchKnowledgeAreas,
  fetchKnowledgeAreasWelcome,
} from '../api/knowledge-areas/knowledge-areas.req';
import { RootState } from '../app/store';

export interface KnowledgeArea {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  description: string | null;
  subjects: { id: number; name: string }[];
}

export interface KnowledgeAreasState {
  status: 'idle' | 'loading' | 'failed';
  list: KnowledgeArea[];
  selectedArea?: KnowledgeArea | null;
}

const initialState: KnowledgeAreasState = {
  status: 'idle',
  list: [],
  selectedArea: null,
};

export const knowledgeAreasSlice = createSlice({
  name: 'knowledgeAreas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKnowledgeAreas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getKnowledgeAreas.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getKnowledgeAreas.fulfilled,
        (state, action: PayloadAction<KnowledgeArea[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );

    builder
      .addCase(getKnowledgeAreasWelcome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getKnowledgeAreasWelcome.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getKnowledgeAreasWelcome.fulfilled,
        (state, action: PayloadAction<KnowledgeArea[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );
  },
});

export const getKnowledgeAreas = createAsyncThunk(
  'knowledgeAreas/getKnowledgeAreas',
  async () => {
    const response = await fetchKnowledgeAreas();
    const knowledgeAreas: KnowledgeArea[] = response.data;

    return knowledgeAreas;
  }
);

export const getKnowledgeAreasWelcome = createAsyncThunk(
  'knowledgeAreas/getKnowledgeAreasWelcome',
  async () => {
    const response = await fetchKnowledgeAreasWelcome();
    const knowledgeAreas: KnowledgeArea[] = response.data;

    return knowledgeAreas;
  }
);

export const {} = knowledgeAreasSlice.actions;

export const selectKnowledgeAreas = (state: RootState) => state.knowledgeAreas;

export default knowledgeAreasSlice.reducer;
