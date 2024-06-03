import React, { useState, useEffect } from 'react';

const Metrics = () => {
    const [metrics, setMetrics] = useState('');

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = () => {
        const metricsUrl = `${window.BACKEND_URL}/metrics`;
        fetch(metricsUrl)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const filteredMetrics = lines.filter(line => line && !line.startsWith('#')).map(line => {
                    const parts = line.split(' ');
                    return `${parts[0]}: ${parts[1]}`;
                }).join(', ');
                setMetrics(filteredMetrics);
            })
            .catch(error => console.error('Error fetching metrics:', error));
    };

    return (
        <div className="App">
        <header className="App-header">
            <h1 className="title">Metrics</h1>
            <p>{metrics}</p>
        </header>
        </div>
    );
};

export default Metrics;
