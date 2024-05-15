from flask import Flask, request, jsonify, send_from_directory
import os
import joblib
from  lib_ml import preprocess_input

app = Flask(__name__, static_folder='/usr/share/nginx/html')

MODEL_PATH = 'models/model.joblib'

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}. Make sure DVC pull was successful.")

model = joblib.load(MODEL_PATH)

@app.route('/api/model', methods=['POST'])
def get_prediction():
    input_data = request.json
    processed_data = preprocess_input(input_data)
    prediction = model.predict([processed_data])
    return jsonify({"prediction": prediction[0]})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
