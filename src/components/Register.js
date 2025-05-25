import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // Clear any previous user info on page load
    React.useEffect(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
    }, []);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('Student');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://codesensei-backend.onrender.com/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, profession, password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('username', name);
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, boxShadow: 3 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
                    Code Sensei
                </Typography>
                <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Register
                </Typography>
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 1,
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 1,
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 1,
                            },
                        }}
                    />
                    <Box sx={{ mt: 2 }}>
                        <label htmlFor="profession" style={{ fontWeight: 500 }}>Profession</label>
                        <select
                            id="profession"
                            name="profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '4px', marginTop: '8px', border: '1px solid #ccc' }}
                        >
                            <option value="Student">Student</option>
                            <option value="Working Professional">Working Professional</option>
                            <option value="Others">Others</option>
                        </select>
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 1,
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/login')}
                        sx={{
                            color: '#1976d2',
                            '&:hover': {
                                color: '#1565c0',
                            },
                        }}
                    >
                        Already have an account? Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
