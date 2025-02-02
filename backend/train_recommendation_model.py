import pandas as pd
import joblib

# Load dataset
file_path = "data.csv"
df = pd.read_csv(file_path)

# Group by weather and find most sold products
weather_recommendations = df.groupby("Weather")["Grocery.Item"].value_counts().groupby(level=0).head(5)

# Convert to dictionary for API use
recommendations_dict = weather_recommendations.to_dict()

# Save recommendations
joblib.dump(recommendations_dict, "weather_recommendations.pkl")

print("Weather-based recommendation model trained successfully!")
