import React, { useState } from 'react';
import './App.css';

const BACKEND_URL = window.BACKEND_URL ?? 'http://localhost:5001';

function Home() {
    const [inputData, setInputData] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = () => {
        fetch(`${BACKEND_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: inputData })
        })
        .then(response => response.json())
        .then(data => setPrediction(data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Welcome to the Prediction App</h1>
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
                            <p key={index}>Score {index + 1}: {score}</p>
                        ))}
                    </pre>
                )}
            </header>
        </div>
    );
}

export default Home;
