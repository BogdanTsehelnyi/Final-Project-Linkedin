import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://final-project-link.onrender.com';

// Асинхронная загрузка списка друзей
export const fetchCarts = createAsyncThunk(
  'friends/fetchCarts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/friends`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch friends data');
      }

      const data = await response.json();
      return data; // Предполагаем, что API возвращает массив друзей
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  friendsData: [], // Список друзей
  loading: false,  // Состояние загрузки
  error: null,     // Ошибки загрузки
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend(state, action) {
      state.friendsData.push(action.payload);
    },
    removeFriend(state, action) {
      state.friendsData = state.friendsData.filter(
        (friend) => friend.id !== action.payload
      );
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
        state.friendsData = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addFriend, removeFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
