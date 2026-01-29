import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
