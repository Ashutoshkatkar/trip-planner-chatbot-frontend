import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { tokens } from './theme.js';

const mdComponents = {
  p: ({ node, ...props }) => (
    <Typography
      component="p"
      sx={{ color: tokens.textLo, lineHeight: 1.75, fontSize: 15.5, mb: 1.5 }}
      {...props}
    />
  ),
  strong: ({ node, ...props }) => (
    <Box component="strong" sx={{ color: tokens.textHi, fontWeight: 700 }} {...props} />
  ),
  ul: ({ node, ...props }) => (
    <Box component="ul" sx={{ pl: 3, m: 0, mb: 1.5 }} {...props} />
  ),
  li: ({ node, ...props }) => (
    <Typography
      component="li"
      sx={{ color: tokens.textLo, lineHeight: 1.75, fontSize: 15.5, mb: 0.5 }}
      {...props}
    />
  ),
  a: ({ node, ...props }) => (
    <Box
      component="a"
      target="_blank"
      rel="noreferrer"
      sx={{ color: tokens.accentB, textDecoration: 'underline', textUnderlineOffset: 2 }}
      {...props}
    />
  ),
};

export default function SectionCard({ title, body, index }) {
  return (
    <Box
      sx={{
        position: 'relative',
        pl: 3,
        py: 2.5,
        pr: { xs: 2, md: 3 },
        mb: 2.5,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.03)',
        border: `1px solid ${tokens.line}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 12,
          bottom: 12,
          width: 3,
          borderRadius: 4,
          background: `linear-gradient(180deg, ${tokens.accentA}, ${tokens.accentB})`,
        },
      }}
    >
      {title && (
        <Typography
          variant="h6"
          sx={{ color: tokens.textHi, mb: 1.2, fontSize: 19, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box
            component="span"
            sx={{
              fontSize: 12,
              fontFamily: '"JetBrains Mono", monospace',
              color: tokens.accentB,
              bgcolor: 'rgba(177,92,255,0.12)',
              border: `1px solid rgba(177,92,255,0.3)`,
              px: 0.9,
              py: 0.2,
              borderRadius: 1,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </Box>
          {title}
        </Typography>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {body}
      </ReactMarkdown>
    </Box>
  );
}
