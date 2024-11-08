import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    register(state) {
      state.error = null;
      state.isAuthenticated = true; // Пользователь успешно зарегистрирован
    },
    login(state) {
      state.error = null;
      state.isAuthenticated = true; // Пользователь успешно вошёл
    },
    logout(state) {
      state.email = '';
      state.password = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, setPassword, register, login, logout } = authSlice.actions;
export default authSlice.reducer;