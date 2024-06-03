import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Metrics from './Metrics';
import Version from './Version';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="app-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/metrics" className="nav-link">Metrics</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/version" className="nav-link">Version</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/metrics" element={<Metrics />} />
                    <Route path="/version" element={<Version />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;