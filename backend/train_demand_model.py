import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import joblib

# Load the dataset
file_path = "data.csv"  # Update with your local path
df = pd.read_csv(file_path)

# Convert Date to datetime format
df["Date"] = pd.to_datetime(df["Date"])

# Encode categorical variables (Grocery.Item, Location, Weather)
label_encoders = {}
for col in ["Grocery.Item", "Location", "Weather"]:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le  # Store encoders for later use

# Save label encoders
joblib.dump(label_encoders, "label_encoders.pkl")

# Define features and target variable
X = df[["Grocery.Item", "Location", "Day", "Month", "Weather"]]
y = df["Quantity.Sold"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model performance
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)

print(f"Model trained successfully! Mean Absolute Error: {mae}")

# Save the trained model
joblib.dump(model, "demand_forecasting_model.pkl")
