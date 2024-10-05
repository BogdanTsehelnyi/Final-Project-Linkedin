import { createSlice } from '@reduxjs/toolkit';

const friendsProfileSlice = createSlice({
  name: 'friend',
  initialState: [],
  reducers: {
    addFriend(state, action) {
      const existingFriend = state.find(item => item.id === action.payload.id);
      if (!existingFriend) {
        state.push(action.payload); // Додаємо нового друга, якщо його ще немає в списку
      } else {
        alert('Цей друг вже був доданий раніше!!!');
      }
    },
    removeFriend(state, action) {
      const updatedState = state.filter(item => item.id !== action.payload);
      return updatedState; // Повертаємо оновлений стан після видалення
    },
  },
});

export const { addFriend, removeFriend } = friendsProfileSlice.actions;
export default friendsProfileSlice.reducer;