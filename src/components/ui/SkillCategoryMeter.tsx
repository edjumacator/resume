import { Box, Typography, LinearProgress } from '@mui/material';
import type { SkillCategory } from '../../types';

interface SkillCategoryMeterProps {
  category: SkillCategory;
}

export function SkillCategoryMeter({ category }: SkillCategoryMeterProps) {
  const normalizedValue = (category.proficiency / 10) * 100;

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category.proficiency}/10
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={normalizedValue}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: category.color || 'primary.main',
          },
        }}
      />
    </Box>
  );
}
