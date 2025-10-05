import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authorsAPI } from '../services/api';

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  const response = await authorsAPI.getAll();
  return response.data;
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false; state.items = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message;
      });
  },
});

export default authorsSlice.reducer;
