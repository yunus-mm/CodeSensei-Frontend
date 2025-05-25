import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Grid, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ComplexityAnalyzer = () => {
    const [code, setCode] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalysis(null);
        setError('');
        try {
            const response = await fetch('https://codesensei-7hnk.onrender.com/api/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setAnalysis(data.analysis);
                setError('');
            } else {
                setError(data.error || 'Analysis failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 4, mt: 8, boxShadow: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
                            <CodeIcon sx={{ mr: 1 }} /> Code Complexity Analyzer
                        </Typography>
                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                placeholder="Paste your code here..."
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: 1,
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<CodeIcon />}
                                fullWidth
                                sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CircularProgress size={20} sx={{ mr: 1 }} />
                                        Analyzing...
                                    </Box>
                                ) : (
                                    'Analyze Code'
                                )}
                            </Button>
                        </Box>
                    </Grid>
                    {analysis && (
                        <Grid item xs={12}>
                            <Divider sx={{ my: 3 }} />
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                        Analysis Results
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="subtitle2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                                    Submitted Code
                                                </Typography>
                                                <Button size="small" onClick={() => navigator.clipboard.writeText(code)} sx={{ mr: 1, color: '#1976d2' }}>Copy</Button>
                                            </Box>
                                            <SyntaxHighlighter
                                                language="cpp"
                                                style={oneLight}
                                                customStyle={{
                                                    background: '#e3f2fd',
                                                    borderRadius: '6px',
                                                    padding: '12px',
                                                    fontSize: '1em',
                                                    margin: '8px 0',
                                                }}
                                            >
                                                {code}
                                            </SyntaxHighlighter>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Time Complexity:
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                                {analysis.timeComplexity}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Space Complexity:
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                                {analysis.spaceComplexity}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Container>
    );
};



export default ComplexityAnalyzer;
