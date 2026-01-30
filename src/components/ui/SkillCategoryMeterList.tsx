import { Box, Typography } from '@mui/material';
import { SkillCategoryMeter } from './SkillCategoryMeter';
import type { SkillCategory } from '../../types';

interface SkillCategoryMeterListProps {
  categories: SkillCategory[];
  selectedCategory?: string | null;
  onCategoryClick?: (categoryName: string) => void;
}

export function SkillCategoryMeterList({ categories, selectedCategory, onCategoryClick }: SkillCategoryMeterListProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: 2,
          color: 'primary.main',
        }}
      >
        Proficiency
      </Typography>
      {categories.map((category) => (
        <SkillCategoryMeter
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.name}
          onClick={onCategoryClick ? () => onCategoryClick(category.name) : undefined}
        />
      ))}
    </Box>
  );
}
