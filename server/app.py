import numpy as np
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('Match Prediction Model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    day = data.get('day')
    time = data.get('time')
    game_week = data.get('gameWeek')

    home_team = data.get('homeTeam')
    away_team = data.get('awayTeam')

    # Prepare the input data for prediction
    input_data = pd.DataFrame([[day,time,game_week, home_team, away_team]],columns=['Day','Time','Game Week','Home Team','Away Team'])
    prediction = model.predict(input_data)
    print(prediction)
    result = ''
    if int(prediction[0]) == 0:
        result = f'{home_team} is predicted to win this match'
    elif int(prediction[0]) == 1:
        result = f'{away_team} is predicted to win this match'
    elif int(prediction[0]) == 2:
        result = 'The match is predicted to be a draw'
    return jsonify({'prediction':result })


if __name__ == '__main__':
    app.run(debug=True)
