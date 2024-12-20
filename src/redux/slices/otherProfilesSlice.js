import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://final-project-link.onrender.com";

// Запит на отримання профілів
export const fetchOtherProfiles = createAsyncThunk(
  "allProfiles/fetchOtherProfiles",
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
  allProfilesData: [], // Усі доступні профілі
  loading: false, // Стан завантаження
  error: null, // Для збереження можливих помилок
};

const otherProfilesSlice = createSlice({
  name: "allProfiles",
  initialState,
  reducers: {
    resetProfiles: (state) => {
      state.allProfilesData = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherProfiles.fulfilled, (state, action) => {
        state.loading = false;

        const uniqueProfiles = action.payload.filter(
          (newProfile) =>
            !state.allProfilesData.some(
              (existingProfile) => existingProfile.userId === newProfile.userId
            )
        );

        state.allProfilesData.push(...uniqueProfiles);
      })
      .addCase(fetchOtherProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetProfiles } = otherProfilesSlice.actions;
// Експортуємо редюсер
export default otherProfilesSlice.reducer;
