import React, { useState } from 'react';

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
        <div>
            <h1>Welcome to the Prediction App</h1>
            <input
                type="text"
                value={inputData}
                onChange={e => setInputData(e.target.value)}
                placeholder="Enter input data"
            />
            <button onClick={handlePredict}>Predict</button>
            {prediction && <pre>{JSON.stringify(prediction, null, 2)}</pre>}
        </div>
    );
}

export default Home;
