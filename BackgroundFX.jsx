import Box from '@mui/material/Box';
import { tokens } from './theme.js';

/**
 * Signature element: a faint dashed "flight path" arcing across the hero,
 * with a small plane icon that travels along it on a slow loop. Sits behind
 * everything, fixed, non-interactive.
 */
export default function BackgroundFX() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: tokens.void,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1100px',
          height: '700px',
          background: `radial-gradient(circle at 50% 30%, rgba(109,93,251,0.28) 0%, rgba(177,92,255,0.12) 35%, transparent 70%)`,
          filter: 'blur(10px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-25%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, rgba(109,93,251,0.10) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        },
      }}
    >
      <svg
        width="100%"
        height="520"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMin slice"
        style={{ position: 'absolute', top: 40, left: 0, opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={tokens.accentA} stopOpacity="0" />
            <stop offset="50%" stopColor={tokens.accentB} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tokens.accentA} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          id="flightArc"
          d="M 60 380 Q 720 -40 1380 380"
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <g>
          <circle r="4" fill={tokens.accentB}>
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#flightArc" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </Box>
  );
}
