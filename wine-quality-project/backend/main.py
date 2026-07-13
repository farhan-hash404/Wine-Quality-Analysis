from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pathlib import Path
import pandas as pd
import numpy as np
import joblib

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Wine Quality Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load(BASE_DIR / "wine_quality_model.pkl")
scaler = joblib.load(BASE_DIR / "scaler.pkl")

df = pd.read_csv(BASE_DIR / "data" / "wine_quality.csv")
if "Id" in df.columns:
    df = df.drop(columns=["Id"])

FEATURE_COLUMNS = [
    "fixed acidity",
    "volatile acidity",
    "citric acid",
    "residual sugar",
    "chlorides",
    "free sulfur dioxide",
    "total sulfur dioxide",
    "density",
    "pH",
    "sulphates",
    "alcohol",
]


@app.get("/feature-ranges")
def get_feature_ranges():
    try:
        ranges = {}
        for col in FEATURE_COLUMNS:
            ranges[col] = {
                "min": float(df[col].min()),
                "max": float(df[col].max()),
            }
        return {"ranges": ranges}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class WineInput(BaseModel):
    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float
    pH: float
    sulphates: float
    alcohol: float


class PredictionResponse(BaseModel):
    predicted_quality: float
    quality_label: str


@app.get("/")
def root():
    return {"status": "ok", "message": "Wine Quality Dashboard API is running"}


@app.get("/summary")
def get_summary():
    try:
        summary = df.describe().to_dict()
        return {
            "row_count": int(len(df)),
            "column_count": int(len(df.columns)),
            "statistics": summary,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/quality-distribution")
def get_quality_distribution():
    try:
        counts = df["quality"].value_counts().sort_index()
        return {
            "labels": counts.index.astype(str).tolist(),
            "counts": counts.values.tolist(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/correlation")
def get_correlation():
    try:
        numeric_df = df.select_dtypes(include=[np.number])
        corr_matrix = numeric_df.corr().round(3)
        return {
            "columns": corr_matrix.columns.tolist(),
            "matrix": corr_matrix.values.tolist(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/high-quality")
def get_high_quality_wines(threshold: int = Query(7, ge=0, le=10)):
    try:
        filtered = df[df["quality"] >= threshold]
        return {
            "threshold": threshold,
            "count": int(len(filtered)),
            "wines": filtered.to_dict(orient="records"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict", response_model=PredictionResponse)
def predict(wine: WineInput):
    try:
        input_df = pd.DataFrame([{
            "fixed acidity": wine.fixed_acidity,
            "volatile acidity": wine.volatile_acidity,
            "citric acid": wine.citric_acid,
            "residual sugar": wine.residual_sugar,
            "chlorides": wine.chlorides,
            "free sulfur dioxide": wine.free_sulfur_dioxide,
            "total sulfur dioxide": wine.total_sulfur_dioxide,
            "density": wine.density,
            "pH": wine.pH,
            "sulphates": wine.sulphates,
            "alcohol": wine.alcohol,
        }])[FEATURE_COLUMNS]

        scaled_input = scaler.transform(input_df)
        prediction = model.predict(scaled_input)[0]
        prediction = round(float(prediction), 2)

        if prediction >= 7:
            label = "High Quality"
        elif prediction >= 5:
            label = "Average Quality"
        else:
            label = "Low Quality"

        return PredictionResponse(predicted_quality=prediction, quality_label=label)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
