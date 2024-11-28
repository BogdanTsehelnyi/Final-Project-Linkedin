import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://final-project-link.onrender.com';

// Асинхронное загрузка данных с API (реальный путь из Swagger)
export const fetchCarts = createAsyncThunk(
  'friend/fetchCarts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/profiles`); // Реальный API путь
      if (!response.ok) {
        throw new Error('Failed to fetch profiles data');
      }
      const data = await response.json();
      return data; // Возвращаем данные
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
      const existingFriend = state.friendsData.find(item => item.profileId === action.payload.profileId);
      if (!existingFriend) {
        state.friendsData.push({ ...action.payload, isFriend: true }); // Добавляем в список друзей
        delete state.pendingRequests[action.payload.profileId]; // Удаляем из списка запросов
      }
    },
    removeFriend(state, action) {
      // Удаляем только из списка друзей, но не из всех профилей
      state.friendsData = state.friendsData.filter(item => item.profileId !== action.payload);
    },
    cancelRequest(state, action) {
      const { profileId } = action.payload;
      delete state.pendingRequests[profileId]; // Удаляем запрос
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
        state.error = action.payload;
      });
  },
});

// Экспортируем действия
export const { addFriend, removeFriend, cancelRequest } = friendsProfileSlice.actions;
export default friendsProfileSlice.reducer;
