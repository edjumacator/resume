import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { TestimonialCard } from '../ui/TestimonialCard';
import { GET_TESTIMONIALS } from '../../graphql/queries';
import type { Testimonial } from '../../types';

export function TestimonialsSection() {
  const { data, loading, error } = useQuery<{ testimonials: Testimonial[] }>(GET_TESTIMONIALS);

  return (
    <Box
      id="testimonials"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            Client Feedback
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Testimonials
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Don't just take my word for it. Here's what my clients have to say about
            working with me.
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Failed to load testimonials
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {data?.testimonials.map((testimonial) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
