import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
}

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://job-board-backend-txjs.onrender.com/jobs')
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map(job => (
          <div
            key={job._id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              background: '#f9f9f9'
            }}
          >
            <h3>{job.title}</h3>
            <p><strong>{job.company}</strong> – {job.location}</p>
            <Link to={`/jobs/${job._id}`} style={{ color: '#0070f3' }}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
