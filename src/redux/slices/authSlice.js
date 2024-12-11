import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

// Thunks
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
    token: "",
    error: null,
    isAuthenticated: false,
    message: null,
  },

  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.email = "";
      state.password = "";
      state.userId = null;
      state.token = "";
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
        state.error = null;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.error = action.payload?.message || "Ошибка регистрации";
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.isVerified = action.payload.isVerified;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        state.error = action.payload?.message || "Ошибка входа";
      });
    // .addCase(fetchForgotPassword.fulfilled, (state, action) => {
    //   state.message = "Лист для скидання пароля надіслано";
    //   state.error = null;
    // })
    // .addCase(fetchForgotPassword.rejected, (state, action) => {
    //   state.error = action.payload;
    // })
    // .addCase(fetchResetPassword.fulfilled, (state) => {
    //   state.message = "Пароль успішно змінено!";
    //   state.error = null;
    // })
    // .addCase(fetchResetPassword.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

export const { setEmail, setPassword, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
