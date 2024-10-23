import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Асинхронне завантаження даних з API
export const fetchCarts = createAsyncThunk(
  'friend/fetchCarts',
  async () => {
    const response = await fetch('/API/anotherProfile.json'); // Ваш API шлях
    if (!response.ok) {
      throw new Error('Failed to fetch friends data');
    }
    const data = await response.json();
    return data;  // Повертаємо дані
  }
);

// Ініціалізація початкового стану
const initialState = {
  allProfiles: [], // Всі доступні профілі
  friendsData: [],  // Тільки список друзів
  loading: false,   // Стан завантаження
  error: null,      // Для збереження можливих помилок
};

const friendsProfileSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend(state, action) {
      const existingFriend = state.friendsData.find(item => item.id === action.payload.id);
      if (!existingFriend) {
        state.friendsData.push({ ...action.payload, isFriend: true }); // Додаємо в список друзів
      }
    },
    removeFriend(state, action) {
      // Видаляємо друга зі списку friendsData
      state.friendsData = state.friendsData.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProfiles = action.payload;  // Зберігаємо всі профілі
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFriend, removeFriend } = friendsProfileSlice.actions;
export default friendsProfileSlice.reducer;
