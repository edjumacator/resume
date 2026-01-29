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
          component="div"
          className="project-image"
          sx={{
            height: 200,
            background: `linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
          }}
        >
          <Typography variant="h3" sx={{ color: 'white', opacity: 0.2, fontWeight: 700 }}>
            {project.title.charAt(0)}
          </Typography>
        </CardMedia>
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
