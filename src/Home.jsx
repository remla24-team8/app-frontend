import React, { useState } from 'react';
import './App.css';

const BACKEND_URL = window.BACKEND_URL ?? 'http://localhost:5001';
const DEPLOY_VERSION = window.DEPLOY_VERSION ?? 'v2';

function Home() {
    const [inputData, setInputData] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = () => {
        fetch(`${BACKEND_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'remla-deploy-version': DEPLOY_VERSION },
            body: JSON.stringify({ url: inputData.split(',').map(item => item.trim()) })
        })
        .then(response => response.json())
        .then(data => setPrediction(data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Welcome to the URL Phishing Prediction App</h1>
                <p className="description">To get started, enter a URL below, or multiple separated with comma's, and click the Predict button.
                    The app will return the chance of the URL being a phishing URL.
                </p>
                <div className="input-container">
                    <input
                        type="text"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        placeholder="Enter input data"
                    />
                    <button className="predict-button" onClick={handlePredict}>
                        Predict
                    </button>
                </div>
                {prediction && (
                    <pre className="prediction-result">
                        {prediction.score.map((score, index) => (
                            <p key={index}>Score {index + 1}: {(score * 100).toFixed(3)}%</p>
                        ))}
                    </pre>
                )}
            </header>
        </div>
    );
}

export default Home;
