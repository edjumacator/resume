import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import type { Project } from '../../types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatDateRange = () => {
    if (!project.startDate && !project.endDate) return null;
    const start = project.startDate || 'Unknown';
    const end = project.endDate || 'Present';
    return `${start} - ${end}`;
  };

  const hasMultipleImages = project.imageUrls && project.imageUrls.length > 1;
  const carouselId = `project-carousel-${project.id}`;

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          height: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
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
          {project.featured && (
            <Chip
              label="Featured"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" component="h3" gutterBottom>
            {project.title}
          </Typography>
          <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>
            {project.category}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.tools.slice(0, 4).map((tool) => (
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
            {project.tools.length > 4 && (
              <Chip
                label={`+${project.tools.length - 4}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            maxHeight: '90vh',
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: { md: 400 },
            }}
          >
            <Box
              sx={{
                flex: { md: '0 0 60%' },
                maxWidth: { md: '60%' },
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                position: 'relative',
              }}
            >
              {hasMultipleImages ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    '& .swiper': {
                      pb: 5,
                    },
                    '& .swiper-slide': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    '& .swiper-pagination': {
                      bottom: 0,
                    },
                    '& .swiper-pagination-bullet': {
                      width: 10,
                      height: 10,
                      backgroundColor: theme.palette.grey[400],
                      opacity: 1,
                      transition: 'all 0.3s ease',
                    },
                    '& .swiper-pagination-bullet-active': {
                      backgroundColor: theme.palette.primary.main,
                      width: 24,
                      borderRadius: 5,
                    },
                  }}
                >
                  <IconButton
                    className={`${carouselId}-prev`}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '45%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      width: 36,
                      height: 36,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                      '&.swiper-button-disabled': {
                        opacity: 0.3,
                        cursor: 'not-allowed',
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    className={`${carouselId}-next`}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '45%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      width: 36,
                      height: 36,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                      '&.swiper-button-disabled': {
                        opacity: 0.3,
                        cursor: 'not-allowed',
                      },
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>

                  <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                      prevEl: `.${carouselId}-prev`,
                      nextEl: `.${carouselId}-next`,
                    }}
                    pagination={{ clickable: true }}
                    a11y={{
                      prevSlideMessage: 'Previous image',
                      nextSlideMessage: 'Next image',
                    }}
                  >
                    {project.imageUrls.map((imageUrl, index) => (
                      <SwiperSlide key={index}>
                        <Box
                          component="img"
                          src={imageUrl}
                          alt={`${project.title} - Image ${index + 1}`}
                          sx={{
                            maxWidth: '100%',
                            maxHeight: { xs: 300, md: 500 },
                            objectFit: 'contain',
                            borderRadius: 1,
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              ) : (
                <Box
                  component="img"
                  src={project.imageUrl}
                  alt={project.title}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: { xs: 300, md: 500 },
                    objectFit: 'contain',
                    borderRadius: 1,
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                flex: { md: '1 1 40%' },
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ mb: 2 }}>
                {project.featured && (
                  <Chip
                    label="Featured Project"
                    size="small"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  />
                )}
                <Typography variant="h3" component="h2" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600 }}>
                  {project.category}
                </Typography>
                {formatDateRange() && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {formatDateRange()}
                  </Typography>
                )}
              </Box>

              {project.description && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  {project.description}
                </Typography>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
                >
                  Technologies
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
              </Box>

              <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                {project.demoUrl && (
                  <Button
                    variant="contained"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LaunchIcon />}
                  >
                    Live Demo
                  </Button>
                )}
                {project.link && !project.demoUrl && (
                  <Button
                    variant="contained"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LaunchIcon />}
                  >
                    View Project
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outlined"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHubIcon />}
                  >
                    Source Code
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
