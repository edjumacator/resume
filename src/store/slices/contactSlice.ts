import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ContactFormData } from '../../types';

interface ContactState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = {
  status: 'idle',
  error: null,
};

export const submitContactForm = createAsyncThunk(
  'contact/submit',
  async (data: ContactFormData) => {
    // Mock API call - simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success (in production, this would be an actual API call)
    console.log('Form submitted:', data);
    return { success: true, message: 'Message sent successfully!' };
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to send message';
      });
  },
});

export const { resetContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
