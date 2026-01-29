import { Box, Typography } from '@mui/material';
import type { Experience } from '../../types';

interface TimelineItemProps {
  experience: Experience;
  isLast?: boolean;
}

export function TimelineItem({ experience, isLast = false }: TimelineItemProps) {
  return (
    <Box sx={{ display: 'flex', gap: 3, position: 'relative' }}>
      {/* Timeline line and dot */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 24,
        }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            flexShrink: 0,
          }}
        />
        {!isLast && (
          <Box
            sx={{
              width: 2,
              flexGrow: 1,
              background: 'linear-gradient(180deg, #7C3AED 0%, rgba(124, 58, 237, 0.2) 100%)',
              mt: 1,
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ pb: isLast ? 0 : 4, flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {experience.startDate} - {experience.endDate}
        </Typography>
        <Typography variant="h4" component="h3" gutterBottom>
          {experience.role}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'secondary.main', fontWeight: 500, mb: 1 }}
        >
          {experience.company}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {experience.description}
        </Typography>
      </Box>
    </Box>
  );
}
