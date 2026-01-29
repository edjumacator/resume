import { useState } from 'react';
import { Box, Container, Typography, Grid, Chip } from '@mui/material';
import { ProjectCard } from '../ui/ProjectCard';
import { projects, categories } from '../../data/portfolio';

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <Box
      id="portfolio"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Recent Work
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            My Portfolio
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
          >
            A selection of my recent projects showcasing my expertise in UI/UX design,
            web development, and brand identity.
          </Typography>

          {/* Category Filters */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setActiveCategory(category)}
                sx={{
                  px: 2,
                  py: 2.5,
                  backgroundColor: activeCategory === category
                    ? 'primary.main'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: activeCategory === category ? 'white' : 'text.secondary',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: activeCategory === category
                      ? 'primary.dark'
                      : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
