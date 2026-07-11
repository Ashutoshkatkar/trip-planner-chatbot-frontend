import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { gradientButton, tokens } from './theme.js';

const SUGGESTIONS = [
  { label: 'Japan Trip', query: 'Plan a complete 7 days Japan trip from India including  hotels and sightseeing under 2 lakhs.' },
  { label: 'Dubai Trip', query: 'Plan a 5 day Dubai trip from India including  hotels and top attractions under 1.5 lakhs.' },
  { label: 'Thailand Trip', query: 'Plan a 6 day Thailand trip from India covering Bangkok and Phuket, with and hotels, under 1 lakh.' }
];

export default function TripForm({ query, setQuery, onGenerate, loading, online }) {
  const [localQuery, setLocalQuery] = useState(query);

  const handleChange = (e) => {
    setLocalQuery(e.target.value);
    setQuery(e.target.value);
  };

  const applySuggestion = (text) => {
    setLocalQuery(text);
    setQuery(text);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        bgcolor: 'rgba(255,255,255,0.035)',
        border: `1px solid ${tokens.line}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ color: tokens.textHi }}>
          Where do you want to go?
        </Typography>
        <Chip
          size="small"
          label={online ? 'Online' : 'Offline'}
          sx={{
            gap:1,
            bgcolor: online ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
            color: online ? tokens.good : '#F87171',
            border: `1px solid ${online ? 'rgba(74,222,128,0.35)' : 'rgba(248,113,113,0.35)'}`,
            fontWeight: 600,
            '& .MuiChip-label': { pl: 0.5 },
          }}
          icon={
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: online ? tokens.good : '#F87171',
                ml: 1.2,
              }}
            />
          }
        />
      </Stack>

      <Typography sx={{ color: tokens.textLo, mb: 2.5, fontSize: 14 }}>
        Example: Plan a complete 7 days Japan trip from India under 2 lakhs.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
        <TextField
          value={localQuery}
          onChange={handleChange}
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          placeholder="Describe the trip you want to plan..."
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(0,0,0,0.25)',
              borderRadius: 2.5,
              color: tokens.textHi,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 14,
              '& fieldset': { borderColor: tokens.line },
              '&:hover fieldset': { borderColor: tokens.lineStrong },
              '&.Mui-focused fieldset': { borderColor: tokens.accentA },
            },
          }}
        />
        <Button
          onClick={onGenerate}
          disabled={loading || !localQuery.trim()}
          sx={{
            minWidth: { xs: '100%', md: 200 },
            background: gradientButton,
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 2.5,
            boxShadow: '0 8px 24px rgba(109,93,251,0.35)',
            '&:hover': { background: gradientButton, filter: 'brightness(1.08)' },
            '&.Mui-disabled': { background: 'rgba(255,255,255,0.08)', color: tokens.textLo },
          }}
          startIcon={
            loading ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              <AutoAwesomeRoundedIcon />
            )
          }
        >
          {loading ? 'Generating…' : 'Generate Plan'}
        </Button>
      </Stack>

      <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
        {SUGGESTIONS.map((s) => (
          <Chip
            key={s.label}
            label={s.label}
            onClick={() => applySuggestion(s.query)}
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: `1px solid ${tokens.line}`,
              color: tokens.textHi,
              fontWeight: 500,
              '&:hover': { borderColor: tokens.accentA, bgcolor: 'rgba(109,93,251,0.12)' },
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
}
