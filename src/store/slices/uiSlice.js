import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export const { toggleMenu, closeMenu, showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;
