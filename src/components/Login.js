import React, { useState } from 'react';
import Header from './Header';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://codesensei-backend.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                // Save token if provided
                try {
                    const profileRes = await fetch(`https://codesensei-backend.onrender.com/api/users/me?email=${encodeURIComponent(email)}`);
                    const profile = await profileRes.json();
                    if (profile && profile.name) {
                        localStorage.setItem('username', profile.name);
                    }
                } catch (profileErr) {
                    // Optionally handle profile fetch error
                }
                navigate('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 8, boxShadow: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1976d2' }}>
                    Login
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
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/register')}
                        sx={{
                            color: '#1976d2',
                            '&:hover': {
                                color: '#1565c0',
                            },
                        }}
                    >
                        Don't have an account? Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};



const LoginWithHeader = (props) => (
    <>
        <Header />
        <Login {...props} />
    </>
);

export default LoginWithHeader;
