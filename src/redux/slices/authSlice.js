import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  error: null,
  isAuthenticated: false,
  isRegistered: false,
};

const users = {};

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
      const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!emailRegex.test(state.email)) {
        state.error = 'Невірний формат email';
        return;
      }
      if (!passwordRegex.test(state.password)) {
        state.error = 'Пароль повинен містити не менше 8 символів, включаючи одну велику та одну малу літеру';
        return;
      }

      if (users[state.email]) {
        state.error = 'Акаунт з таким email вже існує';
        return;
      }

      users[state.email] = state.password;
      state.error = null;
      state.isAuthenticated = true;
      state.isRegistered = true;
    },
    login(state) {
      const correctPassword = users[state.email];
      if (!correctPassword) {
        state.error = 'Акаунт з таким email не існує';
        return;
      }
      if (correctPassword !== state.password) {
        state.error = 'Неправильний пароль для цього акаунта';
        return;
      }

      state.error = null;
      state.isAuthenticated = true;
      state.isRegistered = false;
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