import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import modalReducer from "./slices/modal";
import otherProfilesReducer from "./slices/otherProfilesSlice";
import chatReducer from "./slices/chatSlice";
// import friendsReducer from "./slices/friendsSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import commentsReducer from "./slices/commentsSlice";
import postsReducer from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer, // Використовується state.profile
    changeProfileModal: modalReducer,
    auth: authReducer,
    allProfiles: otherProfilesReducer, // Використовується state.allProfiles
    chat: chatReducer,
    subscription: subscriptionReducer,
    comments: commentsReducer, // Добавляем в store
    posts: postsReducer,
  },
});

export default store;
