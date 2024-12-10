import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

export const fetchRegistration = createAsyncThunk(
  "auth/fetchRegistration",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://final-project-link.onrender.com/auth", {
        email,
        password,
      });
      return response.data; // ожидается ID пользователя
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка регистрации");
    }
  }
);


export const fetchAuthorization = createAsyncThunk(
  "auth/fetchAuthorization",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://final-project-link.onrender.com/login",
        qs.stringify({ username: email, password, "remember-me": rememberMe }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      return response.data; // ожидается ID пользователя
    } catch (error) {
      // Обновленный код для обработки ошибки
      const message =
        error.response?.status === 401
          ? "Неверный пароль. Проверьте введённые данные."
          : error.response?.data || "Ошибка входа";
      return rejectWithValue({ message }); // Передаем ошибку с сообщением
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    userId: null,
    error: null,
    isAuthenticated: false,
  },

  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    logout(state) {
      state.email = "";
      state.password = "";
      state.userId = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Новый action для очистки ошибки
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.error = action.payload?.message || "Ошибка регистрации";
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        state.error = action.payload?.message || "Ошибка входа";
      });
  },
});

export const { setEmail, setPassword, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
