import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { planTrip, pingServer, makeThreadId } from './api/travelApi.js';
import BackgroundFX from './BackgroundFX.jsx';
import Hero from './Hero.jsx';
import TripForm from './TripForm.jsx';
import ResultPanel from './ResultPanel.jsx';
import './index.css';
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState(
    ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [online, setOnline] = useState(true);

  // const threadIdRef = useRef(makeThreadId());
  const abortRef = useRef(null);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

  const handleGenerate = async () => {
    if (!query.trim() || loading) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
     
      const response = await api.post("/api/travel", {
        thread_id: '11',
        message: query.trim(),
      });
       const data = response.data;
      setResult(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to generate itinerary.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundFX />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Container maxWidth="md" sx={{ pb: 10 }}>
          <Hero />
          <TripForm
            query={query}
            setQuery={setQuery}
            onGenerate={handleGenerate}
            loading={loading}
            online={online}
          />
          <ResultPanel loading={loading} error={error} result={result} />
        </Container>
      </Box>
    </Box>
  );
}
