import { Box } from '@mui/material';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Header />
      <Box component="main">
        <HeroSection />
        <ServicesSection />
        <ExperienceSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
