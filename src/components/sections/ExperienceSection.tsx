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
import { GET_EXPERIENCES } from '../../graphql/queries';
import type { Experience, SkillWithYears } from '../../types';

interface ExperiencesQueryResult {
  experiences: Experience[];
  aggregatedSkills: SkillWithYears[];
}

export function ExperienceSection() {
  const { data, loading, error } = useQuery<ExperiencesQueryResult>(GET_EXPERIENCES);
  const [selectedSkills, setSelectedSkills] = useState<SkillWithYears[]>([]);

  // Filter experiences based on selected skills
  const filteredExperiences = useMemo(() => {
    if (!data?.experiences) return [];
    if (selectedSkills.length === 0) return data.experiences;

    const selectedSkillNames = new Set(selectedSkills.map((s) => s.name));
    return data.experiences.filter((exp) =>
      exp.skills?.some((skill) => selectedSkillNames.has(skill))
    );
  }, [data?.experiences, selectedSkills]);

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
          <Grid size={{ xs: 12, md: 4 }}>
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
                Over the years, I've had the privilege of working with amazing teams
                and clients, constantly growing and refining my craft.
              </Typography>
            </Box>
          </Grid>

          {/* Right Column - Skills Filter & Timeline */}
          <Grid size={{ xs: 12, md: 8 }}>
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
                    {selectedSkills.length > 0 && (
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: 'text.secondary' }}
                      >
                        Showing {filteredExperiences.length} of {data.experiences.length} experiences
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
