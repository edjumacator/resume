import { Box, Container, Typography, Grid, CircularProgress, Chip, Stack } from '@mui/material';
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

          {/* Right Column - Skills & Timeline */}
          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">Failed to load experiences</Typography>
            ) : (
              <Box>
                {/* Aggregated Skills Section */}
                {data?.aggregatedSkills && data.aggregatedSkills.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Skills & Technologies
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {data.aggregatedSkills.map((skill) => (
                        <Chip
                          key={skill.name}
                          label={`${skill.name} - ${skill.years} yrs`}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontWeight: 500,
                            mb: 1,
                            '&:hover': {
                              backgroundColor: 'primary.dark',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Timeline */}
                {data?.experiences.map((experience, index) => (
                  <TimelineItem
                    key={experience.id}
                    experience={experience}
                    isLast={index === (data?.experiences.length ?? 0) - 1}
                  />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
