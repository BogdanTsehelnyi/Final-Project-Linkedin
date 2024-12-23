import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://final-project-link.onrender.com";

// 1. Створення поста
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/post`, postData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Отримання усіх постів юзера (без пагінації)
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${userId}/posts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Отримання усіх постів юзера з використанням пагінації
export const fetchPostsWithPagination = createAsyncThunk(
  "posts/fetchPostsWithPagination",
  async ({ userId, page = 0, size }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/post/${userId}/posts?page=${page}&size=${size}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Отримання рекомендованих постів (рандомні)
export const fetchRecommendedPosts = createAsyncThunk(
  "posts/fetchRecommendedPosts",
  async ({ userId, page = 0, size }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/post/${userId}/recommends?page=${page}&size=${size}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 5. Отримання одного поста за postId
export const fetchPostByPostId = createAsyncThunk(
  "posts/fetchPostByPostId",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${postId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 6. Видалення поста
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/post/${postId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 7. Позначити пост як прочитаний
export const markPostAsRead = createAsyncThunk(
  "posts/markPostAsRead",
  async ({ userId, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/readPost?userId=${userId}&postId=${postId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for posts
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.content;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPostsWithPagination.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
      })
      .addCase(fetchPostsWithPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRecommendedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchRecommendedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPostByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post.postId === action.payload.postId ? action.payload : post
        );
      })
      .addCase(fetchPostByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.postId !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
