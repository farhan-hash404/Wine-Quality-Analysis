# Wine Quality Dashboard — Frontend

A React + Vite dashboard for exploring the wine quality dataset and getting
live quality predictions from the FastAPI backend.

## Design

Styled as a "cellar journal" rather than a generic admin dashboard — deep
wine and gold tones, a serif display face (Fraunces) for headings, and a
signature wine-glass gauge on the Predict tab that visually fills based on
the predicted score.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

**The FastAPI backend must be running first** at `http://127.0.0.1:8000`
(see `main.py` / `uvicorn main:app --reload` from the backend project).
If the backend isn't running, each tab will show a "Couldn't reach the API"
message instead of data.

## Structure

```
src/
  api.js                  — fetch wrapper for all 5 backend endpoints
  App.jsx                 — tab routing
  components/
    Header.jsx             — wordmark + tab nav
    Overview.jsx            — dataset summary stat cards + full stats table
    Distribution.jsx        — quality histogram (recharts)
    Correlation.jsx         — feature correlation heatmap
    ReserveList.jsx         — high-quality wines table with threshold slider
    Predict.jsx              — prediction form
    WineGlassGauge.jsx       — signature SVG gauge for prediction results
    Card.jsx                 — shared card/section/loading/error primitives
```

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Notes

- The backend URL is hardcoded to `http://127.0.0.1:8000` in `src/api.js`.
  Change `BASE_URL` there if you deploy the backend elsewhere.
- CORS is already enabled on the FastAPI side for `localhost:3000` and
  `localhost:5173`.
