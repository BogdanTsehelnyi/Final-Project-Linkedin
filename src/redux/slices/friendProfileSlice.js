import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Асинхронное загрузка данных с API
export const fetchCarts = createAsyncThunk(
  'friend/fetchCarts',
  async () => {
    const response = await fetch('/API/anotherProfile.json'); // Ваш API путь
    if (!response.ok) {
      throw new Error('Failed to fetch friends data');
    }
    const data = await response.json();
    return data;  // Возвращаем данные
  }
);

// Инициализация начального состояния
const initialState = {
  allProfiles: [], // Все доступные профили
  friendsData: [],  // Только список друзей
  loading: false,   // Состояние загрузки
  error: null,      // Для сохранения возможных ошибок
  pendingRequests: {} // Хранит ID запросов на добавление друзей
};

const friendsProfileSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend(state, action) {
      const existingFriend = state.friendsData.find(item => item.id === action.payload.id);
      if (!existingFriend) {
        state.friendsData.push({ ...action.payload, isFriend: true }); // Добавляем в список друзей
        delete state.pendingRequests[action.payload.id]; // Удаляем из списка запросов
      }
    },
    removeFriend(state, action) {
      // Удаляем только из списка друзей, но не из всех профилей
      state.friendsData = state.friendsData.filter(item => item.id !== action.payload);
    },
    cancelRequest(state, action) {
      const { id } = action.payload;
      delete state.pendingRequests[id]; // Удаляем запрос
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
        state.allProfiles = action.payload;  // Сохраняем все профили
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFriend, removeFriend, cancelRequest } = friendsProfileSlice.actions;
export default friendsProfileSlice.reducer;