import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

return (
  <div className="container">
    <h1>📋 Job Dashboard</h1>
    <Link to="/create">➕ Create Job</Link>
    <ul>
      {jobs.map(job => (
        <li key={job._id}>
          <div>
            <strong>{job.name}</strong> ({job.schedule}) - {job.status}
          </div>
          <div>
            <Link to={`/edit/${job._id}`}>✏️ Edit</Link>
            <button onClick={() => deleteJob(job._id)}>🗑️ Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

};

export default JobDashboard;
