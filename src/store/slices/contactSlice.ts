import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apolloClient } from '../../graphql/client';
import { SUBMIT_CONTACT } from '../../graphql/queries';
import type { ContactFormData, ContactSubmissionResult } from '../../types';

interface SubmitContactResponse {
  submitContact: ContactSubmissionResult;
}

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
    const { data: result } = await apolloClient.mutate<SubmitContactResponse>({
      mutation: SUBMIT_CONTACT,
      variables: { input: data },
    });

    if (!result?.submitContact.success) {
      throw new Error(result?.submitContact.message || 'Failed to send message');
    }

    return result.submitContact;
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
