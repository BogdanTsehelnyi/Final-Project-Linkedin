import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import modalReducer from "./slices/modal";
import otherProfilesReducer from "./slices/otherProfilesSlice";
import chatReducer from "./slices/chatSlice";
// import friendsReducer from "./slices/friendsSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import commentsReducer from "./slices/commentsSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer, // Використовується state.profile
    changeProfileModal: modalReducer,
    auth: authReducer,
    allProfiles: otherProfilesReducer, // Використовується state.allProfiles
    // friends: friendsReducer, // Використовується state.friends
    chat: chatReducer,
    subscription: subscriptionReducer,
    comments: commentsReducer, // Добавляем в store
  },
});

export default store;
