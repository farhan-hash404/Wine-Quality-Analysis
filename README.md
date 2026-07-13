# Wine Quality Dashboard

A premium wine quality prediction dashboard built with React and FastAPI. Uses a Random Forest Regressor trained on 1,143 red wine samples from the UCI Wine Quality dataset to predict quality scores based on 11 physicochemical features.



## Preview

- **Overview** — Dataset summary with stat cards and full feature statistics table
- **Distribution** — Quality score distribution bar chart
- **Correlation** — Interactive feature correlation heatmap
- **Reserve List** — Filterable table of high-quality wines with adjustable threshold
- **Predict** — 11 range sliders for wine features, real-time quality prediction with animated wine glass gauge

<img width="1366" height="645" alt="Predict" src="https://github.com/user-attachments/assets/6aeecae9-c359-4834-bd57-2e9f9d9531c2" />
<img width="1366" height="918" alt="overview" src="https://github.com/user-attachments/assets/1a132f11-ed3d-45b4-b999-159ca657a08e" />
<img width="1366" height="754" alt="reserve list" src="https://github.com/user-attachments/assets/28892631-44a0-488c-a664-d5780415e54b" />
<img width="1366" height="645" alt="screencapture-localhost-5173-2026-07-14-00_23_31" src="https://github.com/user-attachments/assets/bbf6eea2-3482-4654-9ddf-b07efe85f0f3" />
<img width="1366" height="921" alt="screencapture-localhost-5173-2026-07-14-00_24_00" src="https://github.com/user-attachments/assets/11fb626b-695b-46b3-8772-ac6fa3a92603" />


## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Recharts |
| Backend | FastAPI, Uvicorn |
| ML Model | Scikit-learn (RandomForestRegressor) |

## Project Structure

```
wine-quality-project/
├── api/                          # Vercel serverless function (FastAPI)
│   ├── index.py                  # All API routes
│   ├── wine_quality_model.pkl    # Trained model
│   ├── scaler.pkl                # StandardScaler
│   └── data/
│       └── wine_quality.csv      # Dataset (1,143 samples)
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── Card.jsx          # Reusable card components
│   │   │   ├── Overview.jsx      # Summary stats page
│   │   │   ├── Distribution.jsx  # Quality distribution chart
│   │   │   ├── Correlation.jsx   # Feature correlation heatmap
│   │   │   ├── ReserveList.jsx   # High-quality wines table
│   │   │   ├── Predict.jsx       # Prediction form with sliders
│   │   │   └── WineGlassGauge.jsx # Animated SVG gauge
│   │   ├── api.js                # API client
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/                      # Local dev backend (same as api/)
├── vercel.json                   # Vercel config
├── requirements.txt              # Python dependencies
└── README.md
```

## Getting Started (Local Development)

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Wine-Quality-Analysis.git
cd Wine-Quality-Analysis/wine-quality-project
```

### 2. Start the Backend

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt

# Start the server
python -m uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`. Verify with:

```bash
curl http://localhost:8000/api/
```

### 3. Start the Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at `http://localhost:5173`. Open it in your browser.

### 4. Retrain the Model (Optional)

If you want to retrain the model from scratch:

```bash
cd backend
python train.py
```

This regenerates `wine_quality_model.pkl` and `scaler.pkl`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/` | Health check |
| `GET` | `/api/summary` | Dataset summary statistics |
| `GET` | `/api/quality-distribution` | Quality score histogram data |
| `GET` | `/api/correlation` | Feature correlation matrix |
| `GET` | `/api/high-quality?threshold=7` | Wines above quality threshold |
| `GET` | `/api/feature-ranges` | Min/max for each feature (for sliders) |
| `POST` | `/api/predict` | Predict wine quality from features |

### POST /api/predict

**Request body:**

```json
{
  "fixed_acidity": 7.4,
  "volatile_acidity": 0.7,
  "citric_acid": 0.0,
  "residual_sugar": 1.9,
  "chlorides": 0.076,
  "free_sulfur_dioxide": 11.0,
  "total_sulfur_dioxide": 34.0,
  "density": 0.9978,
  "pH": 3.51,
  "sulphates": 0.56,
  "alcohol": 9.4
}
```

**Response:**

```json
{
  "predicted_quality": 5.01,
  "quality_label": "Average Quality"
}
```

**Quality labels:**
- Score >= 7 → `"High Quality"`
- Score >= 5 → `"Average Quality"`
- Score < 5 → `"Low Quality"`

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd wine-quality-project
vercel

# Follow the prompts, then deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects the config from `vercel.json`
5. Click **Deploy**

The `vercel.json` handles:
- Building the React frontend from `frontend/`
- Deploying the FastAPI backend as a Python serverless function
- Routing `/api/*` to the backend

### Environment Variables (Optional)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend URL for local dev | `http://127.0.0.1:8000` |

In production, the frontend automatically uses relative `/api/` paths (same domain).

## ML Model Details

- **Algorithm**: Random Forest Regressor
- **Estimators**: 200
- **Features**: 11 physicochemical properties
- **Target**: Quality score (3–8)
- **Preprocessing**: StandardScaler (zero mean, unit variance)
- **Test RMSE**: ~0.548
- **Test R²**: ~0.461

### Features

| Feature | Description | Unit |
|---------|-------------|------|
| fixed_acidity | Tartaric acid | g/L |
| volatile_acidity | Acetic acid (vinegar smell at high levels) | g/L |
| citric_acid | Found in small quantities | g/L |
| residual_sugar | Sugar remaining after fermentation | g/L |
| chlorides | Sodium chloride | g/L |
| free_sulfur_dioxide | Free form of SO2 | mg/L |
| total_sulfur_dioxide | Total SO2 (free + bound) | mg/L |
| density | Water density based on alcohol and sugar | g/mL |
| pH | Acidity level (0–14 scale) | — |
| sulphates | Wine additive (antimicrobial) | g/L |
| alcohol | Alcohol content | % vol |

## Dataset
Source: https://www.kaggle.com/datasets/yasserh/wine-quality-dataset

