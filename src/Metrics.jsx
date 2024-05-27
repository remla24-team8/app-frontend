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
        <div>
            <h2>Metrics</h2>
            <p>{metrics}</p>
        </div>
    );
};

export default Metrics;
