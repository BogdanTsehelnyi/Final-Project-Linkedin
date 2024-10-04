import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import moduleChangeProfileReducer from './slices/modal';
import friendProfileReducer from './slices/friendProfileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    changeProfileModal: moduleChangeProfileReducer,
    friend: friendProfileReducer,
  },
});

export default store; 