import { Box, Container, Typography, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ContactForm } from '../../features/contact/ContactForm';

const contactInfo = [
  {
    icon: EmailIcon,
    label: 'Email',
    value: 'hello@jenny.design',
    href: 'mailto:hello@jenny.design',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: LocationOnIcon,
    label: 'Location',
    value: 'San Francisco, CA',
    href: null,
  },
];

export function ContactSection() {
  return (
    <Box
      id="contact"
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
            Get In Touch
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Contact Me
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Have a project in mind? Let's work together to create something amazing.
            Fill out the form below and I'll get back to you as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              {contactInfo.map((info) => (
                <Box
                  key={info.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <info.icon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {info.label}
                    </Typography>
                    {info.href ? (
                      <Typography
                        component="a"
                        href={info.href}
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {info.value}
                      </Typography>
                    ) : (
                      <Typography variant="body1">{info.value}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
