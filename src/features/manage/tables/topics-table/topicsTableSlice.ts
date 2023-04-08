import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopics } from '../../../../api/topics/topics.req';
import { RootState } from '../../../../app/store';
import { Topic } from './types/topic';

export interface TopicsTableState {
  status: 'idle' | 'loading' | 'failed';
  list: Topic[];
  selected?: Topic;
}

const initialState: TopicsTableState = {
  status: 'idle',
  list: [],
  selected: undefined,
};

export const topicsTableSlice = createSlice({
  name: 'topicsTable',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Topic | undefined>) => {
      state.selected = action.payload;
    },
    setList: (state, action: PayloadAction<Topic[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopicsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTopicsList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        getTopicsList.fulfilled,
        (state, action: PayloadAction<Topic[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        }
      );
  },
});

export const getTopicsList = createAsyncThunk(
  'topicsTable/getTopics',
  async () => {
    const response = await fetchTopics();
    const topics: Topic[] = response.data;

    return topics;
  }
);

export const { setSelected, setList } = topicsTableSlice.actions;

export const selectTopicsTable = (state: RootState) => state.topicsTable;

export default topicsTableSlice.reducer;
