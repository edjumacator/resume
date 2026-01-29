import { Box, Container, Typography, Button, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '4', label: 'Acquisitions' },
  { value: '9+', label: 'Years Leadership' },
];

export function HeroSection() {
  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePortfolioClick = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, md: 8 },
        pb: 8,
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Column - Text Content */}
          <Grid size={{ xs: 12, md: 6 }}>
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
              Software Engineering Manager
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Hi, I'm{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                James
              </Box>
              <br />
              Software Engineering Manager
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 480, lineHeight: 1.8 }}
            >
              I build secure, scalable cloud infrastructure and production-grade RESTful web
              services that power high-traffic applications. With 9+ years leading teams, I've
              delivered solutions that played a key role in four acquisitions.
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 6 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleContactClick}
              >
                Get In Touch
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handlePortfolioClick}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  },
                }}
              >
                View Portfolio
              </Button>
            </Box>

            {/* Stats */}
            <Box sx={{ display: 'flex', gap: { xs: 3, md: 6 }, flexWrap: 'wrap' }}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Column - Image/Visual */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Profile Image with gradient border */}
              <Box
                sx={{
                  width: { xs: 280, md: 400 },
                  height: { xs: 280, md: 400 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  padding: '6px',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src="/profile.jpeg"
                  alt="James Crittenden"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Floating elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  opacity: 0.5,
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '5%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'secondary.main',
                  opacity: 0.5,
                  animation: 'float 4s ease-in-out infinite',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
