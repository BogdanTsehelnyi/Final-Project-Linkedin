import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import modalReducer from "./slices/modal";
import friendProfileReducer from "./slices/friendProfileSlice";
import friendsReducer from "./slices/friendsSlice";
import commentsReducer from "./slices/commentsSlice"; // Подключаем commentsSlice

const store = configureStore({
  reducer: {
    profile: profileReducer,
    changeProfileModal: modalReducer,
    friend: friendProfileReducer,
    auth: authReducer,
    friends: friendsReducer,
    comments: commentsReducer, // Добавляем в store
  },
});

export default store;
