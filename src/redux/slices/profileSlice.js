import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await fetch('/API/profile.json');
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    const data = await response.json();
    console.log('Fetched profile data:', data);
    return data;
  }
);

const initialState = {
  profileData: {},
  loading: false,  
  error: null,     
};


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      // Оновлюємо тільки ті поля, які надійшли в дії
      state.profileData = {
        ...state.profileData,  // Залишаємо поточні дані профілю
        ...action.payload      // Оновлюємо новими даними
      };
    }
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.error.message;
      });
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;