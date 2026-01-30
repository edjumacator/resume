import { Box, Typography, LinearProgress } from '@mui/material';
import type { SkillCategory } from '../../types';

interface SkillCategoryMeterProps {
  category: SkillCategory;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SkillCategoryMeter({ category, isSelected, onClick }: SkillCategoryMeterProps) {
  const normalizedValue = (category.proficiency / 10) * 100;

  return (
    <Box
      onClick={onClick}
      sx={{
        mb: 2,
        cursor: onClick ? 'pointer' : 'default',
        p: 1,
        mx: -1,
        borderRadius: 1,
        border: isSelected ? `2px solid ${category.color || 'primary.main'}` : '2px solid transparent',
        boxShadow: isSelected ? `0 0 12px ${category.color || 'primary.main'}40` : 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        } : {},
      }}
    >
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
