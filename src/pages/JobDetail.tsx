import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
}

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    axios.get(`https://job-board-backend-txjs.onrender.com/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error('Error loading job:', err));
  }, [id]);

  if (!job) return <div style={{ padding: '2rem' }}>Loading job details...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <Link to={`/apply/${job._id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
        Apply Now
      </Link>
    </div>
  );
};

export default JobDetail;
