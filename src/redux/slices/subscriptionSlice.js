import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://final-project-link.onrender.com";

// Підписка на користувача
export const subscribeToUser = createAsyncThunk(
  "subscription/subscribeToUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/subscription/subscribed`,
        { followerId, followingId }, // Дані для запиту
        { withCredentials: true } // Налаштування запиту
      );

      console.log("Підписка на користувача:", response.data);
      return response.data; // Повертаємо дані з відповіді
    } catch (error) {
      // Обробка помилок
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Відписка від користувача
export const unsubscribeFromUser = createAsyncThunk(
  "subscription/unsubscribeFromUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/subscription/unsubscribed`,
        { followerId, followingId }, // Дані для запиту
        { withCredentials: true } // Налаштування запиту
      );
      console.log("Відписка від користувача", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Отримання число людей, на яких ти підписаний
export const fetchQuantitySubscribed = createAsyncThunk(
  "subscription/fetchQuantitySubscribed",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/subscription/getFollowing/${userId}`,
        { withCredentials: true } // Налаштування запиту
      );
      console.log("Отримання числа людей на яких підписаний користувач", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Отримання числа підписників користувача
export const quantitySubscribers = createAsyncThunk(
  "subscription/quantitySubscribers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/subscription/getFollowers/${userId}`,
        { withCredentials: true } // Налаштування запиту
      );
      console.log("Отримання числа підписників користувача", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Отримання списку друзів
export const fetchSubscriptions = createAsyncThunk(
  "subscription/fetchSubscriptions",
  async ({ userId, page, size }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/subscription/getAllSubscriptions/${userId}?page=${page}&size=${size}`,
        { withCredentials: true } // Налаштування запиту
      );
      console.log("Отримання списку друзів", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Отримання списку підписників
export const fetchFollowers = createAsyncThunk(
  "subscription/fetchFollowers",
  async ({ userId, page, size }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/subscription/getAllSubscribers/${userId}?page=${page}&size=${size}`,
        { withCredentials: true } // Налаштування запиту
      );
      console.log("Отримання списку підписників", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  subscribedData: [], // Список друзей
  followersData: [], // Список подписчиков
  quantitySubscribed: null, // Число людей на которых подписан пользователь
  quantitySubscribers: null, // Число подписчиков пользователя
  loading: false, // Состояние загрузки
  error: null, // Ошибки загрузки
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.subscribedData.push(action.payload);
      })
      .addCase(subscribeToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unsubscribeFromUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribeFromUser.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedData = state.subscribedData.filter(
          (item) => item.userId !== action.payload.userId
        );
      })
      .addCase(unsubscribeFromUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuantitySubscribed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuantitySubscribed.fulfilled, (state, action) => {
        state.loading = false;
        state.quantitySubscribed = action.payload;
      })
      .addCase(fetchQuantitySubscribed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(quantitySubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quantitySubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.quantitySubscribers = action.payload;
      })
      .addCase(quantitySubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedData = action.payload.content;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followersData = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
