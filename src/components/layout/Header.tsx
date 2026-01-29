import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMobileMenuOpen, setActiveSection } from '../../store/slices/uiSlice';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const dispatch = useAppDispatch();
  const { mobileMenuOpen, activeSection } = useAppSelector((state) => state.ui);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            dispatch(setActiveSection(section));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handleNavClick = (href: string) => {
    dispatch(setMobileMenuOpen(false));
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            component="a"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            James Crittenden
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={() => dispatch(setMobileMenuOpen(true))}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: activeSection === link.href.substring(1) ? 'primary.main' : 'text.secondary',
                    fontWeight: activeSection === link.href.substring(1) ? 600 : 400,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavClick('#contact')}
                sx={{ ml: 2 }}
              >
                Hire Me
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => dispatch(setMobileMenuOpen(false))}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => dispatch(setMobileMenuOpen(false))}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(link.href)}
                sx={{
                  py: 2,
                  color: activeSection === link.href.substring(1) ? 'primary.main' : 'text.primary',
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2, px: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleNavClick('#contact')}
            >
              Hire Me
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
