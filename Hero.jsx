import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import { gradientText, tokens } from './theme.js';

export default function Hero() {
  return (
    <Box sx={{ textAlign: 'center', pt: { xs: 8, md: 12 }, pb: { xs: 5, md: 7 } }}>
      <Chip
        icon={<FlightTakeoffRoundedIcon sx={{ color: `${tokens.accentB} !important`, fontSize: 18 }} />}
        label="AK-TripMate AI — A Multi-Agent Travel Planner with LangGraph"
        sx={{
          bgcolor: 'rgba(124,92,255,0.12)',
          border: `1px solid ${tokens.lineStrong}`,
          color: tokens.textHi,
          fontFamily: '"Inter", sans-serif',
          fontSize: 13,
          fontWeight: 500,
          px: 1,
          py: 2.4,
          mb: 4,
          backdropFilter: 'blur(6px)',
        }}
      />

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.6rem' },
          lineHeight: 1.05,
          ...gradientText,
        }}
      >
        Plan Your Perfect Trip with AI
      </Typography>

      <Typography
        sx={{
          mt: 3,
          maxWidth: 620,
          mx: 'auto',
          color: tokens.textLo,
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: 1.6,
        }}
      >
        Discover hotels, and generate a complete travel itinerary
        using a multi-agent LangGraph system.
      </Typography>
    </Box>
  );
}
