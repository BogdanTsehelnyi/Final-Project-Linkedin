import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://final-project-link.onrender.com";

// створення коментаря

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, authorId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/comments/create`,
        { postId, authorId, content }, // Дані для запиту
        { withCredentials: true } // Налаштування запиту
      );
      return response.data; // Повертаємо дані з відповіді
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Отримати список коментарів за ID поста (з посторінковим завантаженням)
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async ({ postId, page, size = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comments/list/${postId}?page=${page}&size=${size}`, // Динамічний URL із query-параметрами
        { withCredentials: true } // Налаштування запиту
      );
      return response.data; // Повертаємо масив коментарів
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Отримати кількість коментарів до поста
export const fetchCommentCount = createAsyncThunk(
  "comments/fetchCommentCount",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comments/count/${postId}`, // Динамічний URL
        { withCredentials: true } // Налаштування запиту
      );
      return response.data; // Повертаємо кількість коментарів
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Видалити коментар (логічне видалення)
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/comments/delete/${commentId}`, // Динамічний URL
        { withCredentials: true } // Налаштування запиту
      );
      return commentId; // Повертаємо ID видаленого коментаря
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Слайс для коментарів
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // Список коментарів
    totalCount: 0, // Загальна кількість коментарів
    loading: false, // Стан завантаження
    error: null, // Помилки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка створення коментаря
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload); // Додаємо новий коментар на початок списку
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка отримання коментарів
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload; // Замінюємо список коментарів новими
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка отримання кількості коментарів
      .addCase(fetchCommentCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCount = action.payload; // Зберігаємо загальну кількість коментарів
      })
      .addCase(fetchCommentCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка видалення коментаря
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment.commentId !== action.payload); // Видаляємо коментар зі списку
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
