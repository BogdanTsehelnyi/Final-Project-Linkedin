import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import moduleChangeProfileReducer from './slices/modal';
import friendProfileReducer from './slices/friendProfileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    changeProfileModal: moduleChangeProfileReducer,
    friend: friendProfileReducer,
    auth: authReducer,
  },
});

export default store; 
