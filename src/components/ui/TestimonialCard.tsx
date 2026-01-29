import { Card, CardContent, Typography, Box, Avatar, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 4, pt: 5 }}>
        <FormatQuoteIcon
          sx={{
            position: 'absolute',
            top: -16,
            left: 24,
            fontSize: 48,
            color: 'primary.main',
            opacity: 0.5,
          }}
        />
        <Rating
          value={testimonial.rating}
          readOnly
          sx={{
            mb: 2,
            '& .MuiRating-iconFilled': {
              color: '#FBBF24',
            },
          }}
        />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, fontStyle: 'italic' }}
        >
          "{testimonial.quote}"
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            }}
          >
            {testimonial.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonial.role} at {testimonial.company}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
