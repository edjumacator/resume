import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeSection: string;
  mobileMenuOpen: boolean;
}

const initialState: UIState = {
  activeSection: 'home',
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const { setActiveSection, setMobileMenuOpen, toggleMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
