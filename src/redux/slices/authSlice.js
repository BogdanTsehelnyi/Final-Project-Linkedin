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
      return response.data; // Очікуємо id користувача
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
      return response.data; // Очікуємо id користувача
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка входа");
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setEmail, setPassword, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// export const fetchRegistration = creareAsyncThunk("auth/fetchRegistration", async () => {})
// export const fetchAuthorization= creareAsyncThunk("auth/fetchRegistration", async () => {})

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     email: "",
//     password: "",
//     userId: null, // Додаємо поле для userId
//     error: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     setEmail(state, action) {
//       state.email = action.payload;
//     },
//     setPassword(state, action) {
//       state.password = action.payload;
//     },
//     setUserId(state, action) {
//       state.userId = action.payload; // Задаємо id користувача
//     },
//     register(state) {
//       state.error = null;
//       state.isAuthenticated = true;
//     },
//     login(state) {
//       state.error = null;
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.email = "";
//       state.password = "";
//       state.userId = null; // Очищаємо userId при виході
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setEmail, setPassword, setUserId, register, login, logout } = authSlice.actions;
// export default authSlice.reducer;
