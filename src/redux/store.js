import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import modalReducer from './slices/modal';
import friendProfileReducer from './slices/friendProfileSlice';
import friendsReducer from './slices/friendsSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,         // Використовується state.profile
    changeProfileModal: modalReducer,
    friend: friendProfileReducer,    // Використовується state.friend
    auth: authReducer,
    friends: friendsReducer,         // Використовується state.friends
  },
});

export default store; 
