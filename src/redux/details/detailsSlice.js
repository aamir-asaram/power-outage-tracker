import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://eskom-calendar-api.shuttleapp.rs';

const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async (area) => {
    const response = await fetch(`${baseURL}/area/${area}`);
    const data = await response.json();
    return data;
  },
);

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    details: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchDetails };

export default detailsSlice.reducer;
