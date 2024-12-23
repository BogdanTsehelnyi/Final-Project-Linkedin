import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://final-project-link.onrender.com";

// // Запит на отримання профілів - приклад правильного виконання запиту
// export const fetchOtherProfiles = createAsyncThunk(
//   "allProfiles/fetchOtherProfiles",
//   async ({ userId, page, limit }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/profiles?page=${page}&limit=${limit}`, {
//         withCredentials: true,
//       });
//       const filterData = response.data.filter((profile) => profile.userId !== userId);
//       console.log("filterData", filterData);

//       return filterData;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Створення сповіщення

// {
//   "recipientId": 0, // id отримувача
//   "authorId": 0, // id автора
//   "eventId": 0, // id події , наприклад id поста
//   "message": "string", // повідомлення
//   "notificationType": "POST" //  тип сповіщення
// }

export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/notifications`, notificationData, {
        withCredentials: true,
      });
      console.log("Створення сповіщення", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Ініціалізація початкового стану
const initialState = {
  notifications: [], // Усі доступні профілі
  loading: false, // Стан завантаження
  error: null, // Для збереження можливих помилок
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});
// export const {  } = notificationsSlice.actions;
// Експортуємо редюсер
export default notificationsSlice.reducer;
