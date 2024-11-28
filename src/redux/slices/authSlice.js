import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  userId: null, // Додаємо поле для userId
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload; // Задаємо id користувача
    },
    register(state) {
      state.error = null;
      state.isAuthenticated = true;
    },
    login(state) {
      state.error = null;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.email = "";
      state.password = "";
      state.userId = null; // Очищаємо userId при виході
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, setPassword, setUserId, register, login, logout } = authSlice.actions;
export default authSlice.reducer;
