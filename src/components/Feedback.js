import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Rating, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_lro2j82'; 
const TEMPLATE_ID = 'template_rwfxvl7'; 
const USER_ID = 'j7EqqEd_SLx2UEUWE'; 

const Feedback = () => {
  const [form, setForm] = useState({ type: 'Feedback', name: '', email: '', rating: 0, message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    setForm({ ...form, type: e.target.value });
  };

  const handleRating = (event, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          type: form.type,
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          rating: form.rating,
        },
        USER_ID
      );
      setSuccess(true);
      setForm({ name: '', email: '', rating: 0, message: '' });
    } catch (err) {
      setError('Failed to send feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8, boxShadow: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <EmailIcon sx={{ color: '#1976d2', fontSize: 40, mr: 1 }} />
          <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 700 }}>
            Complain / Feedback
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, color: '#444' }}>
          We value your feedback! Please fill out the form below.
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>Thank you for your feedback!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" sx={{ textAlign: 'left', fontWeight: 500 }}>Type</Typography>
            <select
              name="type"
              value={form.type}
              onChange={handleTypeChange}
              style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            >
              <option value="Feedback">Feedback</option>
              <option value="Complaint">Complaint</option>
            </select>
          </Box>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" sx={{ textAlign: 'left', fontWeight: 500 }}>Rating</Typography>
            <Rating
              name="rating"
              value={form.rating}
              onChange={handleRating}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            label="Your Feedback / Complaint"
            name="message"
            value={form.message}
            onChange={handleChange}
            multiline
            minRows={4}
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
          >
            {loading ? 'Sending...' : 'Submit'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Feedback;
