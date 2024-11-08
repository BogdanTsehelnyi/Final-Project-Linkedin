import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openProfileModal: false,   // Стан для модалки редагування профілю
  openInfoModal: false       // Стан для інформаційної модалки
};

const moduleChangeProfileSlice = createSlice({
  name: 'changeProfileModal',
  initialState,
  reducers: {
    handleOpenProfileModal(state) {
        state.openProfileModal = true;
    },
    handleCloseProfileModal(state) {
        state.openProfileModal = false;
    },
    handleOpenInfoModal(state) {
        state.openInfoModal = true;
    },
    handleCloseInfoModal(state) {
        state.openInfoModal = false;
    },
  },
});

export const { 
    handleOpenProfileModal, 
    handleCloseProfileModal, 
    handleOpenInfoModal, 
    handleCloseInfoModal 
} = moduleChangeProfileSlice.actions;

export default moduleChangeProfileSlice.reducer;
