
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# ------------------------------------------------------------------
# Load data
# ------------------------------------------------------------------
df = pd.read_csv("data/wine_quality.csv")

# Drop the row-id column -- not a predictive feature
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

X = df[FEATURE_COLUMNS]
y = df["quality"]

# ------------------------------------------------------------------
# Split, scale, train
# ------------------------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train_scaled, y_train)

# ------------------------------------------------------------------
# Evaluate
# ------------------------------------------------------------------
predictions = model.predict(X_test_scaled)
rmse = mean_squared_error(y_test, predictions) ** 0.5
r2 = r2_score(y_test, predictions)

print(f"Test RMSE: {rmse:.3f}")
print(f"Test R^2:  {r2:.3f}")

# ------------------------------------------------------------------
# Save artifacts
# ------------------------------------------------------------------
joblib.dump(model, "wine_quality_model.pkl")
joblib.dump(scaler, "scaler.pkl")
print("\nSaved wine_quality_model.pkl and scaler.pkl")