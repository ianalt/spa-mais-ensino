import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchKnowledgeAreas } from "../../../../api/knowledge-areas/knowledge-areas.req";
import { RootState } from "../../../../app/store";
import { KnowledgeArea } from "../../../../slices/knowledgeAreasSlice";

export interface KnowledgeAreasTableState {
  status: "idle" | "loading" | "failed";
  list: KnowledgeArea[];
  selected?: KnowledgeArea;
}

const initialState: KnowledgeAreasTableState = {
  status: "idle",
  list: [],
  selected: undefined,
};

export const knowledgeAreasTableSlice = createSlice({
  name: "knowledgeAreasTable",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<KnowledgeArea | undefined>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<KnowledgeArea[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKnowledgeAreasList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getKnowledgeAreasList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        getKnowledgeAreasList.fulfilled,
        (state, action: PayloadAction<KnowledgeArea[]>) => {
          state.status = "idle";
          state.list = action.payload;
        }
      );
  },
});

export const getKnowledgeAreasList = createAsyncThunk(
  "knowledgeAreasTable/getKnowledgeAreas",
  async () => {
    const response = await fetchKnowledgeAreas();
    const knowledgeAreas: KnowledgeArea[] = response.data;

    return knowledgeAreas;
  }
);

export const { setSelected, setList } = knowledgeAreasTableSlice.actions;

export const selectKnowledgeAreasTable = (state: RootState) =>
  state.knowledgeAreasTable;

export default knowledgeAreasTableSlice.reducer;
