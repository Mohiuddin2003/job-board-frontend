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

  useEffect(() => {
    axios.get('https://job-board-backend.onrender.com/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>Loading jobs...</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{job.title}</h3>
            <p>{job.company} – {job.location}</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </div>

        ))
      )}
    </div>
  );
};

export default Home;
