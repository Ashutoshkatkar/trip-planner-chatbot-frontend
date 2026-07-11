import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { tokens } from '/theme.js';
import { parseSections } from './parseSections.js';
import SectionCard from './SectionCard.jsx';

function LoadingSkeleton() {
  return (
    <Stack spacing={2.5}>
      {[0, 1, 2].map((i) => (
        <Box key={i} sx={{ p: 2.5, borderRadius: 2, border: `1px solid ${tokens.line}` }}>
          <Skeleton variant="text" width="35%" height={28} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
          <Skeleton variant="text" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" height={20} width="90%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" height={20} width="70%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
      ))}
    </Stack>
  );
}

export default function ResultPanel({ loading, error, result }) {
  const [copied, setCopied] = useState(false);

  if (!loading && !error && !result) return null;

  const answer = result?.answer || result?.itinerary || '';
  const sections = parseSections(answer);

  const handleCopy = async () => {
    if (!answer) return;
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: tokens.textHi, fontSize: { xs: 24, md: 28 } }}>
            Your AI Travel Plan
          </Typography>
          {result?.thread_id && (
            <Typography
              sx={{
                mt: 0.5,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12.5,
                color: tokens.textLo,
              }}
            >
              Thread ID: {result.thread_id}
            </Typography>
          )}
        </Box>

        {result && (
          <Stack direction="row" spacing={1.5}>
            <Button
              onClick={handleCopy}
              startIcon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
              sx={{
                color: tokens.textHi,
                bgcolor: 'rgba(255,255,255,0.05)',
                border: `1px solid ${tokens.line}`,
                borderRadius: 2,
                px: 2,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.09)' },
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              onClick={handleDownloadPdf}
              startIcon={<PictureAsPdfRoundedIcon />}
              sx={{
                color: '#0A0714',
                bgcolor: tokens.good,
                fontWeight: 700,
                borderRadius: 2,
                px: 2,
                '&:hover': { bgcolor: '#3fce74' },
              }}
            >
              Download PDF
            </Button>
          </Stack>
        )}
      </Stack>

      <Paper
        id="result-panel-print"
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          bgcolor: 'rgba(255,255,255,0.03)',
          border: `1px solid ${tokens.line}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <Typography sx={{ color: '#F87171', fontSize: 15 }}>
            Something went wrong: {error}
          </Typography>
        )}

        {!loading && !error && result && (
          <>
            {sections.length > 0 ? (
              sections.map((s, i) => <SectionCard key={i} index={i} title={s.title} body={s.body} />)
            ) : (
              <Typography sx={{ color: tokens.textLo }}>{answer}</Typography>
            )}

            {Array.isArray(result.hotel_results) && result.hotel_results.length > 0 && (
              <>
                <Divider sx={{ my: 3, borderColor: tokens.line }} />
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <MapRoundedIcon sx={{ color: tokens.accentB, fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: tokens.textHi, fontSize: 17 }}>
                    Sources referenced
                  </Typography>
                </Stack>
                <Typography sx={{ color: tokens.textLo, fontSize: 13.5 }}>
                  {result.llm_calls != null && `Generated using ${result.llm_calls} agent call${result.llm_calls === 1 ? '' : 's'}.`}
                </Typography>
              </>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}
