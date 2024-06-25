import React, { useState, useEffect } from 'react';

const BACKEND_URL = window.BACKEND_URL;

const Version = () => {
    const [version, setVersion] = useState('');

    if (BACKEND_URL) {
        useEffect(() => {
            fetch(`${window.BACKEND_URL}/version`)
                .then(response => response.json())
                .then(data => setVersion(data.version))
                .catch(error => console.error('Error fetching version:', error));
        }, []);
    }

    return (
        <div className="App">
        <header className="App-header">
            <h1 className="title">App version</h1>
            <p>{version}</p>
        </header>
        </div>
    );
};

export default Version;
