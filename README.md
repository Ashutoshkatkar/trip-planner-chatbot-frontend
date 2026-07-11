# TripMate AI — Frontend

React + Material UI implementation of the TripMate AI travel planner UI,
wired to your FastAPI backend at `http://127.0.0.1:8000/travel`.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

Make sure your FastAPI server is running on `127.0.0.1:8000` with CORS
enabled for your frontend origin (e.g. add
`CORSMiddleware(allow_origins=["http://localhost:5173"])` in FastAPI),
otherwise the browser will block the request.

## How it works

- `src/api/travelApi.js` — calls `POST /travel` with JSON body
  `{ thread_id, query }`, matching the `travel_planner_api_travel_post`
  operation. A `thread_id` (`user_<32 hex chars>`) is generated once per
  browser session so follow-up queries can share conversation memory if
  your backend supports it.
- `src/App.jsx` — holds the query text, loading/error state, and the last
  API response; also polls `/` every 15s to drive the Online/Offline pill.
- `src/components/TripForm.jsx` — the "Where do you want to go?" card,
  including the example hint, textarea, Generate Plan button, and the
  quick-suggestion chips (Japan / Dubai / Thailand / Global Flights).
- `src/components/ResultPanel.jsx` — "Your AI Travel Plan" card: shows the
  thread ID, Copy button (copies raw markdown), and Download PDF button
  (triggers the browser print dialog, styled via the print rules in
  `src/index.css` so it prints cleanly).
- `src/utils/parseSections.js` + `src/components/SectionCard.jsx` — the
  API's `answer` field is markdown with `## Heading` sections (Trip
  Summary, Flight Information, Day-by-Day Itinerary, Estimated Budget,
  etc). This splits on those headings and renders each in its own
  accent-bordered card via `react-markdown`.

## Folder structure

```
src/
  api/travelApi.js       API client
  components/
    BackgroundFX.jsx     ambient gradient + animated flight-path signature
    Hero.jsx              headline + eyebrow badge
    TripForm.jsx           query input + suggestions + status pill
    ResultPanel.jsx        results header, copy/pdf actions, skeleton loader
    SectionCard.jsx         one markdown section, rendered
  utils/parseSections.js  splits `answer` markdown on `##` headings
  theme.js                MUI theme + design tokens
  App.jsx
  main.jsx
```

## Notes

- If your backend's response shape differs from the sample (`answer`,
  `hotel_results`, `itinerary`, `llm_calls`, `thread_id`), adjust
  `ResultPanel.jsx` (it falls back to `result.itinerary` if `answer` is
  missing).
- Swap the hardcoded `BASE_URL` in `travelApi.js` if your API isn't on
  `127.0.0.1:8000`.
