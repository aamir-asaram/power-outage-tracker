import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchProvinces = createAsyncThunk(
  'provinces/fetchProvinces',
  async () => {
    const response = await fetch('https://eskom-calendar-api.shuttleapp.rs/list_areas');
    const data = await response.json();
    return data;
  },
);

const provincesSlice = createSlice({
  name: 'provinces',
  initialState: {
    provinces: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
        state.loading = false;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchProvinces };

export default provincesSlice.reducer;
