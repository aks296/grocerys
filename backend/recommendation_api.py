from flask import Flask, request, jsonify
import joblib

# Load precomputed recommendations
recommendations_dict = joblib.load("weather_recommendations.pkl")

# Initialize Flask app
app = Flask(__name__)

@app.route("/recommend", methods=["GET"])
def recommend_products():
    try:
        # Get weather parameter
        weather = request.args.get("weather")
        
        if weather in recommendations_dict:
            recommended_items = recommendations_dict[weather]
        else:
            recommended_items = ["No recommendations available for this weather"]

        return jsonify({"recommended_products": recommended_items})

    except Exception as e:
        return jsonify({"error": str(e)})

# Run the API
if __name__ == "__main__":
    app.run(debug=True, port=5001)
