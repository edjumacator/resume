import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { TimelineItem } from '../ui/TimelineItem';
import { GET_EXPERIENCES } from '../../graphql/queries';
import type { Experience } from '../../types';

export function ExperienceSection() {
  const { data, loading, error } = useQuery<{ experiences: Experience[] }>(GET_EXPERIENCES);

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

          {/* Right Column - Timeline */}
          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">Failed to load experiences</Typography>
            ) : (
              <Box>
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
