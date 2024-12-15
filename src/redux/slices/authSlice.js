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
      console.log("fetchRegistration", response.data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Registration Error:", error); // Вивід повної помилки
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
      console.log("fetchAuthorization", response.data);
      return response.data; // ожидается ID пользователя
    } catch (error) {
      console.error("Registration Error:", error); // Вивід повної помилки
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
    message: null,
    loading: false,
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
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.userId = action.payload.data.id;
       
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.error = action.payload?.message || "Ошибка регистрации";
        state.loading = false;
      })
      .addCase(fetchAuthorization.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        state.error = action.payload?.message || "Ошибка входа";
        state.loading = false;
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
