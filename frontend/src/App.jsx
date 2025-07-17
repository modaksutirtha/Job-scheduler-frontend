import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobDashboard from './components/JobDashboard.jsx';
import JobForm from './components/JobForm.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobDashboard />} />
        <Route path="/create" element={<JobForm />} />
        <Route path="/edit/:id" element={<JobForm />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
