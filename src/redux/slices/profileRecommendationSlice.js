import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://final-project-link.onrender.com";

// Запит на отримання профілів
export const fetchOtherProfiles = createAsyncThunk(
  "profileRecommendation/fetchOtherProfiles",
  async ({ userId, page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/profiles?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });
      const filterData = response.data.filter((profile) => profile.userId !== userId);
      console.log("filterData", filterData);

      return filterData;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Ініціалізація початкового стану
const initialState = {
  allProfiles: [], // Усі доступні профілі
  loading: false, // Стан завантаження
  error: null, // Для збереження можливих помилок
};

const profileRecommendationSlice = createSlice({
  name: "profileRecommendation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.allProfiles = action.payload;
      })
      .addCase(fetchOtherProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Експортуємо редюсер
export default profileRecommendationSlice.reducer;
