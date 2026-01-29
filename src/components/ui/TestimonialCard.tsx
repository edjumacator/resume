import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Rating,
  Button,
  Collapse,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  resetKey?: number;
}

const COLLAPSED_HEIGHT = 120;
const MAX_PREVIEW_LENGTH = 200;

export function TestimonialCard({ testimonial, resetKey }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLongQuote = testimonial.quote.length > MAX_PREVIEW_LENGTH;

  // Collapse when slide changes
  useEffect(() => {
    setExpanded(false);
  }, [resetKey]);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        minHeight: 320,
      }}
    >
      <CardContent
        sx={{
          p: 4,
          pt: 5,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
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

        {/* Quote with expand/collapse */}
        <Box sx={{ flex: 1, mb: 2 }}>
          {isLongQuote ? (
            <>
              <Collapse in={expanded} collapsedSize={COLLAPSED_HEIGHT}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontStyle: 'italic', whiteSpace: 'pre-line' }}
                >
                  "{testimonial.quote}"
                </Typography>
              </Collapse>
              <Button
                size="small"
                onClick={() => setExpanded(!expanded)}
                endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  color: 'primary.main',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                {expanded ? 'Show less' : 'Read more'}
              </Button>
            </>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontStyle: 'italic', whiteSpace: 'pre-line' }}
            >
              "{testimonial.quote}"
            </Typography>
          )}
        </Box>

        {/* Author info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
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
