import { Card, CardContent, Typography, Box } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import WebIcon from '@mui/icons-material/Web';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import type { Service } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  DesignServices: DesignServicesIcon,
  Web: WebIcon,
  RocketLaunch: RocketLaunchIcon,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || DesignServicesIcon;

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(124, 58, 237, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <IconComponent sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Typography variant="h4" component="h3" gutterBottom>
          {service.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
