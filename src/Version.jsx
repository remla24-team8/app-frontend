import React, { useState, useEffect } from 'react';

const Version = () => {
    const [version, setVersion] = useState('');

    useEffect(() => {
        fetch(`${window.BACKEND_URL}/version`)
            .then(response => response.json())
            .then(data => setVersion(data.version))
            .catch(error => console.error('Error fetching version:', error));
    }, []);

    return (
        <div>
            <h2>App Version</h2>
            <p>{version}</p>
        </div>
    );
};

export default Version;
