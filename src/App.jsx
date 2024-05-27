import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Metrics from './Metrics';
import Version from './Version';

function App() {
  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/metrics">Metrics</Link></li>
                      <li><Link to="/version">Version</Link></li>
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
