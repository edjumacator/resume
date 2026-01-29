import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { submitContactForm, resetContactStatus } from '../../store/slices/contactSlice';
import type { ContactFormData } from '../../types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
});

export function ContactForm() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.contact);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      privacyAccepted: false,
    },
  });

  useEffect(() => {
    if (status === 'succeeded') {
      reset();
      const timer = setTimeout(() => {
        dispatch(resetContactStatus());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, reset, dispatch]);

  const onSubmit = (data: ContactFormData) => {
    dispatch(submitContactForm(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === 'succeeded' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Thank you for your message! I'll get back to you soon.
        </Alert>
      )}

      {status === 'failed' && error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={status === 'loading'}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={status === 'loading'}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Message"
                multiline
                rows={5}
                fullWidth
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={status === 'loading'}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="privacyAccepted"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    disabled={status === 'loading'}
                    sx={{
                      color: errors.privacyAccepted ? 'error.main' : 'text.secondary',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label="I accept the Privacy Policy"
                sx={{
                  color: errors.privacyAccepted ? 'error.main' : 'text.secondary',
                }}
              />
            )}
          />
          {errors.privacyAccepted && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', ml: 2 }}>
              {errors.privacyAccepted.message}
            </Box>
          )}
        </Grid>

        <Grid size={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={status === 'loading'}
            endIcon={
              status === 'loading' ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{ minWidth: 180 }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
