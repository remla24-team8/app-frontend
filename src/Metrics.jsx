import React, { useState, useEffect } from 'react';

const BACKEND_URL = window.BACKEND_URL;
const DEPLOY_VERSION = window.DEPLOY_VERSION ?? 'v2';

const Metrics = () => {
    const [metrics, setMetrics] = useState([]);

    if (BACKEND_URL) {
        useEffect(() => {
            fetchMetrics();
        }, []);
    }
    
    const fetchMetrics = () => {
        const metricsUrl = `${window.BACKEND_URL}/metrics`;
        fetch(metricsUrl, { headers: { 'remla-deploy-version': DEPLOY_VERSION } })
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const filteredMetrics = lines.filter(line => line && !line.startsWith('#')).map(line => {
                    const parts = line.split(' ');
                    return { key: parts[0], value: parts[1] };
                });
                setMetrics(filteredMetrics);
            })
            .catch(error => console.error('Error fetching metrics:', error));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">Metrics</h1>
                <div className="metrics-container">
                    {BACKEND_URL && (
                        <div className="metrics-list">
                            {metrics.map((metric, index) => (
                                <div key={index} className="metric-item">
                                    <span className="metric-key">{metric.key}</span>: 
                                    <span className="metric-value">{metric.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {!BACKEND_URL && (
                        <p>BACKEND_URL is not set. Metrics not available.</p>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Metrics;
