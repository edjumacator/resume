import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(124, 58, 237, 0.15)',
        },
        '&:hover .project-image': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          component="img"
          className="project-image"
          image={project.imageUrl}
          alt={project.title}
          sx={{
            height: 200,
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>
          {project.category}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {project.tools.map((tool) => (
            <Chip
              key={tool}
              label={tool}
              size="small"
              sx={{
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
