import { createTheme } from '@mui/material/styles';

// --- Design tokens -----------------------------------------------------
// Base:     #0A0714  (near-black void)
// Surface:  #14102A  (elevated panel, glassy)
// Line:     rgba(255,255,255,0.08)
// Accent A: #6D5DFB  (indigo)
// Accent B: #B15CFF  (violet)
// Text hi:  #F3F1FA
// Text lo:  #9C96B8
// Good:     #4ADE80  (online pulse)

export const tokens = {
  void: '#0A0714',
  surface: '#14102A',
  surfaceHi: '#1B1636',
  line: 'rgba(255,255,255,0.08)',
  lineStrong: 'rgba(255,255,255,0.14)',
  accentA: '#6D5DFB',
  accentB: '#B15CFF',
  textHi: '#F3F1FA',
  textLo: '#9C96B8',
  good: '#4ADE80',
};

export const gradientText = {
  background: `linear-gradient(90deg, #E7E3FF 0%, ${tokens.accentB} 55%, ${tokens.accentA} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const gradientButton = `linear-gradient(135deg, ${tokens.accentA} 0%, ${tokens.accentB} 100%)`;

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: tokens.void,
      paper: tokens.surface,
    },
    primary: {
      main: tokens.accentA,
    },
    secondary: {
      main: tokens.accentB,
    },
    text: {
      primary: tokens.textHi,
      secondary: tokens.textLo,
    },
  },
  typography: {
    fontFamily: '"Inter", "Sora", system-ui, sans-serif',
    h1: { fontFamily: '"Sora", sans-serif', fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Sora", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.void,
        },
      },
    },
  },
});

export default theme;
