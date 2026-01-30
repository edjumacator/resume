import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Autocomplete,
  TextField,
  Chip,
} from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { TimelineItem } from '../ui/TimelineItem';
import { SkillCategoryMeterList } from '../ui/SkillCategoryMeterList';
import { GET_EXPERIENCES } from '../../graphql/queries';
import type { Experience, SkillWithYears, SkillCategory } from '../../types';

interface ExperiencesQueryResult {
  experiences: Experience[];
  aggregatedSkills: SkillWithYears[];
  skillCategories: SkillCategory[];
}

// Maps skill category meter names to the skill categories they represent
const categoryToSkillCategories: Record<string, string[]> = {
  'Front-end': ['Frontend'],
  'Back-end': ['Backend', 'Database'],
  'DevOps': ['DevOps'],
  'Security': ['Security'],
  'Design': ['Frontend'], // Design skills are typically in Frontend category
};

// Get the dominant skill categories for an experience
const getDominantCategories = (skills: SkillWithYears[] | undefined): string[] => {
  if (!skills || skills.length === 0) return [];

  // Count skills by category
  const categoryCounts: Record<string, number> = {};
  for (const skill of skills) {
    if (skill.category) {
      categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
    }
  }

  // Find the max count
  const maxCount = Math.max(...Object.values(categoryCounts));
  if (maxCount === 0) return [];

  // Return all categories that have the max count (handles ties)
  return Object.entries(categoryCounts)
    .filter(([, count]) => count === maxCount)
    .map(([category]) => category);
};

export function ExperienceSection() {
  const { data, loading, error } = useQuery<ExperiencesQueryResult>(GET_EXPERIENCES);
  const [selectedSkills, setSelectedSkills] = useState<SkillWithYears[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  // Filter experiences based on selected skills and/or selected category
  const filteredExperiences = useMemo(() => {
    if (!data?.experiences) return [];

    let filtered = data.experiences;

    // Filter by category if selected - show experiences where the selected category is dominant
    if (selectedCategory) {
      const targetCategories = categoryToSkillCategories[selectedCategory] || [selectedCategory];
      filtered = filtered.filter((exp) => {
        const dominantCategories = getDominantCategories(exp.skillsWithYears);
        return dominantCategories.some((dominant) => targetCategories.includes(dominant));
      });
    }

    // Filter by selected skills if any
    if (selectedSkills.length > 0) {
      const selectedSkillNames = new Set(selectedSkills.map((s) => s.name));
      filtered = filtered.filter((exp) =>
        exp.skills?.some((skill) => selectedSkillNames.has(skill))
      );
    }

    return filtered;
  }, [data?.experiences, selectedSkills, selectedCategory]);

  return (
    <Box
      id="experience"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Left Column - Header */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
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
                Career Path
              </Typography>
              <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                My Experience
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Full-stack engineer with a background in cloud infrastructure and
                team leadership. I like solving interesting problems and helping
                teams ship good software.
              </Typography>
              {data?.skillCategories && (
                <SkillCategoryMeterList
                  categories={data.skillCategories}
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />
              )}
            </Box>
          </Grid>

          {/* Right Column - Skills Filter & Timeline */}
          <Grid size={{ xs: 12, md: 9 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">Failed to load experiences</Typography>
            ) : (
              <Box>
                {/* Skills Filter Autocomplete */}
                {data?.aggregatedSkills && data.aggregatedSkills.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Skills & Technologies
                    </Typography>
                    <Autocomplete
                      multiple
                      options={data.aggregatedSkills}
                      groupBy={(option) => option.category || 'Other'}
                      getOptionLabel={(option) => `${option.name} (${option.years} yrs)`}
                      value={selectedSkills}
                      onChange={(_, newValue) => setSelectedSkills(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={selectedSkills.length === 0 ? "Filter by skills..." : ""}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'background.default',
                            },
                          }}
                        />
                      )}
                      renderGroup={(params) => (
                        <li key={params.key}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              color: 'primary.main',
                              px: 2,
                              py: 1,
                              backgroundColor: 'background.paper',
                              position: 'sticky',
                              top: -8,
                              zIndex: 1,
                            }}
                          >
                            {params.group}
                          </Typography>
                          <ul style={{ padding: 0 }}>{params.children}</ul>
                        </li>
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                          const { key, ...tagProps } = getTagProps({ index });
                          return (
                            <Chip
                              key={key}
                              label={`${option.name} - ${option.years} yrs`}
                              size="small"
                              {...tagProps}
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 500,
                                '& .MuiChip-deleteIcon': {
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  '&:hover': {
                                    color: 'white',
                                  },
                                },
                              }}
                            />
                          );
                        })
                      }
                      renderOption={(props, option) => {
                        const { key, ...otherProps } = props;
                        return (
                          <Box
                            component="li"
                            key={key}
                            {...otherProps}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            <span>{option.name}</span>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.secondary', ml: 2 }}
                            >
                              {option.years} yrs
                            </Typography>
                          </Box>
                        );
                      }}
                      isOptionEqualToValue={(option, value) => option.name === value.name}
                      sx={{ width: '100%' }}
                    />
                    {(selectedSkills.length > 0 || selectedCategory) && (
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: 'text.secondary' }}
                      >
                        Showing {filteredExperiences.length} of {data.experiences.length} experiences
                        {selectedCategory && ` (filtered by ${selectedCategory})`}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Timeline */}
                {filteredExperiences.length > 0 ? (
                  filteredExperiences.map((experience, index) => (
                    <TimelineItem
                      key={experience.id}
                      experience={experience}
                      isLast={index === filteredExperiences.length - 1}
                    />
                  ))
                ) : (
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                    No experiences match the selected skills.
                  </Typography>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
