import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import type { Experience } from '../../types';

interface TimelineItemProps {
  experience: Experience;
  isLast?: boolean;
}

function parseDescription(description: string) {
  const lines = description.split('\n').filter((line) => line.trim());
  const bullets = lines.filter((line) => line.trim().startsWith('•'));

  if (bullets.length > 0) {
    return bullets.map((line) => line.replace(/^•\s*/, '').trim());
  }
  return null;
}

export function TimelineItem({ experience, isLast = false }: TimelineItemProps) {
  const bulletPoints = parseDescription(experience.description);

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
          sx={{ color: 'secondary.main', fontWeight: 500, mb: 2 }}
        >
          {experience.company}
        </Typography>

        {experience.summary && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {experience.summary}
          </Typography>
        )}

        {bulletPoints ? (
          <List dense disablePadding>
            {bulletPoints.map((point, index) => (
              <ListItem key={index} disablePadding sx={{ alignItems: 'flex-start', py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 24, mt: 1 }}>
                  <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={point}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="text.secondary">
            {experience.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
