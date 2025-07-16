import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_link: '',
    cover_letter: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://job-board-backend-txjs.onrender.com/applications', {
        job_id: id,
        ...formData,
      });
      setMessage('✅ Application submitted successfully!');
      setFormData({ name: '', email: '', resume_link: '', cover_letter: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit application.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📄 Apply for Job</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
        <input
          type="url"
          name="resume_link"
          placeholder="Link to Resume"
          value={formData.resume_link}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
        <textarea
          name="cover_letter"
          placeholder="Cover Letter"
          value={formData.cover_letter}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '300px', height: '100px' }}
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyForm;
