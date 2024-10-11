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
  friendsData: [],  // Список друзів
  loading: false,   // Стан завантаження
  error: null,      // Для збереження можливих помилок
  pendingRequests: {},
};

const friendsProfileSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend(state, action) {
      const existingFriend = state.friendsData.find(item => item.id === action.payload.id);
      if (!existingFriend) {
        state.friendsData.push(action.payload); // Додаємо нового друга
        delete state.pendingRequests[action.payload.id]; // Видаляємо зі списку "Pending"
      }
    },
    cancelRequest(state, action) {
      // Скасовуємо запит на додавання друга
      delete state.pendingRequests[action.payload.id];
    },
    removeFriend(state, action) {
      // Видаляємо друга зі списку друзів
      state.friendsData = state.friendsData.filter(item => item.id !== action.payload); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;  // Починаємо завантаження
        state.error = null;    // Очищуємо помилки
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;  // Завантаження завершене
        state.friendsData = action.payload;  // Зберігаємо завантажені дані
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;  // Завантаження завершене з помилкою
        state.error = action.error.message;  // Зберігаємо повідомлення про помилку
      });
  },
});

export const { addFriend, confirmAddFriend, cancelRequest, removeFriend } = friendsProfileSlice.actions;
export default friendsProfileSlice.reducer;
