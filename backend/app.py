from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)
model_service_url = os.getenv('MODEL_SERVICE_URL', 'http://localhost:5000')

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json
    response = requests.post(f'{model_service_url}/predict', json=input_data)
    return jsonify(response.json())

@app.route('/version', methods=['GET'])
def version():
    # Assuming lib-version is a Python package that has a __version__ attribute
    import lib_ml
    return jsonify({"version": lib_ml.__version__})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
