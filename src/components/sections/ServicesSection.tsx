import { Box, Container, Typography, Grid } from '@mui/material';
import { ServiceCard } from '../ui/ServiceCard';
import { services } from '../../data/services';

export function ServicesSection() {
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
            What I Do
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            My Services
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            I offer a comprehensive range of design services to help businesses create
            impactful digital experiences that engage and convert.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid size={{ xs: 12, md: 4 }} key={service.id}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
