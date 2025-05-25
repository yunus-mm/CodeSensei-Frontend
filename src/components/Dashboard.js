import React from 'react';
import { Container, Paper, Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 5, mt: 8, boxShadow: 3, textAlign: 'center', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1976d2', mb: 2, fontWeight: 700 }}>
                    Welcome to CodeSensei
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: '#333', fontWeight: 400 }}>
                    Your all-in-one assistant for code complexity analysis and AI-powered conversations.<br />
                    Jump right in to explore our two main features below!
                </Typography>
                <Grid container spacing={6} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <CodeIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                aria-label="Open Code Complexity Analyzer"
                                sx={{ py: 2, fontSize: '1.2rem', mb: 1, borderRadius: 2, transition: 'transform 0.2s, opacity 0.2s', '&:hover': { transform: 'scale(1.04)', opacity: 0.9 } }}
                                onClick={() => navigate('/complexity')}
                            >
                                Code Complexity Analyzer
                            </Button>
                            <Typography variant="body1" sx={{ color: '#444', mt: 1 }}>
                                Analyze your code for complexity and get instant insights with easy-to-understand metrics.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <ChatBubbleIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                aria-label="Open Code Assistant AI"
                                sx={{ py: 2, fontSize: '1.2rem', mb: 1, borderRadius: 2, transition: 'transform 0.2s, opacity 0.2s', '&:hover': { transform: 'scale(1.04)', opacity: 0.9 } }}
                                onClick={() => navigate('/chatbot')}
                            >
                                Code Assistant AI
                            </Button>
                            <Typography variant="body1" sx={{ color: '#444', mt: 1 }}>
                                Ask coding questions, get explanations, and receive instant AI-powered help.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="outlined"
                        sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 2, fontWeight: 600, color: '#1976d2', borderColor: '#1976d2', '&:hover': { backgroundColor: '#1976d2', color: '#fff', borderColor: '#1976d2' } }}
                        onClick={() => navigate('/feedback')}
                    >
                        Complain / Feedback
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};



const DashboardWithHeader = (props) => (
    <Dashboard {...props} />
);

export default DashboardWithHeader;
