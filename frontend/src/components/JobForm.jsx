import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    name: '',
    schedule: '',
    command: '',
    priority: 'Medium',
    dependencies: '',
    retry: 0,
  });

  const fetchJob = async () => {
    if (id) {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      const data = res.data;
      setJob({ ...data, dependencies: data.dependencies.join(',') });
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...job,
      dependencies: job.dependencies.split(',').map(d => d.trim()),
    };

    if (id) {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, payload);
    } else {
      await axios.post('http://localhost:5000/api/jobs/create', payload);
    }

    navigate('/');
  };

  return (
  <div className="container">
    <h2>{id ? 'Edit' : 'Create'} Job</h2>
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Job Name" value={job.name} onChange={handleChange} />
      <input name="schedule" placeholder='e.g., "every 5" or "daily at 03:00"' value={job.schedule} onChange={handleChange} />
      <input name="command" placeholder="Command" value={job.command} onChange={handleChange} />
      <select name="priority" value={job.priority} onChange={handleChange}>
        <option>High</option><option>Medium</option><option>Low</option>
      </select>
      <input name="dependencies" placeholder="Comma-separated Job IDs" value={job.dependencies} onChange={handleChange} />
      <input name="retry" type="number" placeholder="Retry count" value={job.retry} onChange={handleChange} />
      <button type="submit">{id ? 'Update' : 'Create'} Job</button>
    </form>
  </div>
);

};

export default JobForm;
