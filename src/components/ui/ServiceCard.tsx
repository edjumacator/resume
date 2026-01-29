import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SecurityIcon from '@mui/icons-material/Security';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import type { Service } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  Code: CodeIcon,
  Storage: StorageIcon,
  Cloud: CloudIcon,
  TableChart: TableChartIcon,
  AccountTree: AccountTreeIcon,
  Security: SecurityIcon,
  DesignServices: DesignServicesIcon,
};

interface ServiceCardProps {
  service: Service;
  resetKey?: number;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || DesignServicesIcon;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(124, 58, 237, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            flexShrink: 0,
          }}
        >
          <IconComponent sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Typography variant="h4" component="h3" gutterBottom>
          {service.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
          {service.description}
        </Typography>

        {/* Skills Chips */}
        {service.skills && service.skills.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            sx={{ mt: 'auto' }}
          >
            {service.skills.slice(0, 5).map((skill) => (
              <Chip
                key={skill.name}
                label={skill.name}
                size="small"
                sx={{
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'rgba(124, 58, 237, 0.2)',
                  },
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
