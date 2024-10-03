import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import moduleChangeProfileReducer from './slices/modal';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    changeProfileModal: moduleChangeProfileReducer,
  },
});

export default store; 