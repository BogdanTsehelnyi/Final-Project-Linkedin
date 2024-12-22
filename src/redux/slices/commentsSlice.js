import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "https://final-project-link.onrender.com";
 
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, authorId, content }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Токен авторизации из auth
      const response = await axios.post(
        `${BASE_URL}/comments`,
        { postId, authorId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Получить список комментариев по ID поста (с постраничной загрузкой)
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async ({ postId, page = 0, size = 5 }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${BASE_URL}/comments/post/${postId}`,
        {
          params: { page, size },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Возвращает массив комментариев
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Получить количество комментариев к посту
export const fetchCommentCount = createAsyncThunk(
  "comments/fetchCommentCount",
  async ({ postId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${BASE_URL}/comments/count/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Общее количество комментариев
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Удалить комментарий (логическое удаление)
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${BASE_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return commentId; // Возвращает ID удаленного комментария
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Слайс для комментариев
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // Список комментариев
    totalCount: 0, // Общее количество комментариев
    loading: false, // Состояние загрузки
    error: null, // Ошибки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка создания комментария
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload); // Добавляем новый комментарий в начало списка
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обработка получения комментариев
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload; // Заменяем список комментариев
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обработка получения количества комментариев
      .addCase(fetchCommentCount.fulfilled, (state, action) => {
        state.totalCount = action.payload; // Сохраняем общее количество комментариев
      })

      // Обработка удаления комментария
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.commentId !== action.payload
        ); // Удаляем комментарий из списка
      });
  },
});

export default commentsSlice.reducer;
