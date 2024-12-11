import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Запит для створення профілю
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://final-project-link.onrender.com/profiles",
        profileData,
        { withCredentials: true }
      );
      console.log("Запит для створення профілю (відповідь модалки)", response.data);

      return response.data; // Очікуємо об'єкт з profileId
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Запит для отримання профілю за profileId
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://final-project-link.onrender.com/profiles/${profileId}`,
        { withCredentials: true }
      );
      console.log("отримання профілю за profileId", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProfileByUserId = createAsyncThunk(
  "profile/fetchProfileByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://final-project-link.onrender.com/profiles/user`, {
        params: {
          userId: userId, // передаємо userId як параметр запиту
        },
        withCredentials: true,
      });
      console.log("отримання профілю за userId ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  profileData: {},
  profileId: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = {
        ...state.profileData,
        ...action.payload,
      };
    },
    logoutProfile(state) {
      Object.assign(state, initialState); // Скидаємо стейт до початкового
    },
  },

  extraReducers: (builder) => {
    builder
      // Створення профілю
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileId = action.payload.profileId; // Зберігаємо profileId
        state.profileData = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Отримання профілю за profileId
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Отримання профілю за userId
      .addCase(fetchProfileByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload; // Оновлюємо профільні дані
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfileData, logoutProfile } = profileSlice.actions;
export default profileSlice.reducer;
