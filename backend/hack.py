# Import necessary libraries
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib  # For saving the trained model

app = Flask(__name__)

# Load and preprocess the data
data = pd.read_csv('data.csv')


# Group the data by Month and Grocery Item, and sum the Quantity Sold
monthly_sales = data.groupby(['Month', 'Grocery.Item'])['Quantity.Sold'].sum().reset_index()

# Get the top 10 most sold grocery items per month
top_10_monthly = monthly_sales.groupby('Month').apply(lambda x: x.nlargest(10, 'Quantity.Sold')).reset_index(drop=True)

# Group the data by Season and Grocery Item, and sum the Quantity Sold
data['Season'] = data['Month'].apply(lambda x: 'Winter' if x in [12, 1, 2] else ('Spring' if x in [3, 4, 5] else ('Summer' if x in [6, 7, 8] else 'Fall')))
seasonal_sales = data.groupby(['Season', 'Grocery.Item'])['Quantity.Sold'].sum().reset_index()

# Get the top 10 most sold grocery items per season
top_10_seasonal = seasonal_sales.groupby('Season').apply(lambda x: x.nlargest(10, 'Quantity.Sold')).reset_index(drop=True)

print(top_10_monthly)
print(top_10_seasonal)

# Display the last 60 rows of the top_10_monthly DataFrame
top_10_monthly.tail(60)

# Display the first 60 rows of the top_10_monthly DataFrame
top_10_monthly.head(60)

# Encode categorical variables (like Weather and Month)
features = pd.get_dummies(features)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the trained model using joblib (optional)
joblib.dump(model, 'sales_forecasting_model.pkl')

# Evaluate the model
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)
print(f'Mean Absolute Error: {mae}')
print(f'Root Mean Squared Error: {rmse}')

# Load the model function
def load_model():
    return joblib.load('sales_forecasting_model.pkl')

@app.route('/forecast_sales', methods=['POST'])
def forecast_sales():
    # Receive data from the frontend
    data = request.get_json()
    
    # Parse the incoming data
    month = data.get('month')
    weather = data.get('weather')
    
    if not month or not weather:
        return jsonify({'error': 'Missing month or weather data'}), 400
    
    # Preprocess the data (same encoding as in training)
    input_data = pd.DataFrame([[month, weather]], columns=['Month', 'Weather'])
    input_data = pd.get_dummies(input_data)
    
    # Ensure all columns match the training data (by adding missing columns if needed)
    input_data = input_data.reindex(columns=features.columns, fill_value=0)
    
    # Predict the sales using the trained model
    model = load_model()
    forecasted_sales = model.predict(input_data)
    
    return jsonify({'forecasted_sales': forecasted_sales[0]})

if __name__ == '__main__':
    app.run(debug=True)
