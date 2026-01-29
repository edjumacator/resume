import { Box, Container, Typography, Grid, IconButton, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Web Design', href: '#services' },
    { label: 'Landing Pages', href: '#services' },
    { label: 'Branding', href: '#services' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: GitHubIcon, href: '#', label: 'GitHub' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        pt: 8,
        pb: 4,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Jenny
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 280 }}>
              Crafting beautiful digital experiences with passion and precision. Let's create something amazing together.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Navigation Column */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Navigation
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.navigation.map((link) => (
                <Box component="li" key={link.label} sx={{ mb: 1 }}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Services Column */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Services
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.services.map((link) => (
                <Box component="li" key={link.label} sx={{ mb: 1 }}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Legal Column */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Legal
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.legal.map((link) => (
                <Box component="li" key={link.label} sx={{ mb: 1 }}>
                  <Link
                    href={link.href}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Jenny. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
