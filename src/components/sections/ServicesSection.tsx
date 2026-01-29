import { useState } from 'react';
import { Box, Container, Typography, CircularProgress, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ServiceCard } from '../ui/ServiceCard';
import { GET_SERVICES } from '../../graphql/queries';
import type { Service } from '../../types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function ServicesSection() {
  const { data, loading, error } = useQuery<{ services: Service[] }>(GET_SERVICES);
  const [slideChangeKey, setSlideChangeKey] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            What I Offer
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            My Services
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Full-stack engineering expertise across the entire development lifecycle,
            from architecture design to production deployment.
          </Typography>
        </Box>

        {/* Services Carousel */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Failed to load services
          </Typography>
        ) : (
          <Box
            sx={{
              position: 'relative',
              px: { xs: 0, md: 6 },
              '& .swiper': {
                pb: 6,
                pt: 3,
                px: 1,
              },
              '& .swiper-slide': {
                height: 'auto',
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
            {/* Custom Navigation Buttons */}
            <IconButton
              className="swiper-button-prev-services"
              sx={{
                position: 'absolute',
                left: { xs: -8, md: 0 },
                top: '45%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'background.paper',
                boxShadow: 2,
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
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
              className="swiper-button-next-services"
              sx={{
                position: 'absolute',
                right: { xs: -8, md: 0 },
                top: '45%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'background.paper',
                boxShadow: 2,
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
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
              spaceBetween={24}
              slidesPerView={slidesPerView}
              navigation={{
                prevEl: '.swiper-button-prev-services',
                nextEl: '.swiper-button-next-services',
              }}
              pagination={{ clickable: true }}
              a11y={{
                prevSlideMessage: 'Previous service',
                nextSlideMessage: 'Next service',
              }}
              onSlideChange={() => setSlideChangeKey((prev) => prev + 1)}
            >
              {data?.services.map((service) => (
                <SwiperSlide key={service.id}>
                  <ServiceCard service={service} resetKey={slideChangeKey} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
      </Container>
    </Box>
  );
}
