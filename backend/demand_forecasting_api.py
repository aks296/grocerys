from flask import Flask, request, jsonify, render_template
import joblib

# Load the trained model and encoders
model = joblib.load("demand_forecasting_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# Initialize Flask app
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict_demand():
    try:
        # Get request data
        data = request.get_json()
        
        # Extract input features
        grocery_item = data["Grocery.Item"]
        location = data["Location"]
        day = data["Day"]
        month = data["Month"]
        weather = data["Weather"]

        # Encode categorical inputs
        grocery_item_encoded = label_encoders["Grocery.Item"].transform([grocery_item])[0]
        location_encoded = label_encoders["Location"].transform([location])[0]
        weather_encoded = label_encoders["Weather"].transform([weather])[0]

        # Create input array
        input_data = [[grocery_item_encoded, location_encoded, day, month, weather_encoded]]

        # Predict demand
        predicted_demand = model.predict(input_data)[0]

        # Return response
        return jsonify({"predicted_demand": round(predicted_demand)})

    except Exception as e:
        return jsonify({"error": str(e)})

# Run the API
if __name__ == "__main__":
    app.run(debug=True)
