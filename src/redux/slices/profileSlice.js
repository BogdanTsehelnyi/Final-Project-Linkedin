import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'https://final-project-link.onrender.com';

// GET: Отримання даних профілю
export const fetchProfileById = createAsyncThunk(
  'profile/fetchProfileById',
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/profiles/${profileId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data; // Повертаємо отримані дані профілю
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST: Створення нового профілю
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT: Оновлення профілю
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ profileId, profileData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/profiles/${profileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Початковий стан
const initialState = {
  profileData: {}, // Поточний профіль
  loading: false,
  error: null,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profileData = {}; // Очищення даних профілю
    },
    setProfileData: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // POST
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // PUT
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Експортуємо дії
export const { clearProfile, setProfileData } = profileSlice.actions;

// Експортуємо редюсер та функцію updateProfile
export default profileSlice.reducer;