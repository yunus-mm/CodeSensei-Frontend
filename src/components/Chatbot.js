import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, List, ListItem, Divider } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = React.createRef(null);
    const inputRef = React.createRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Prepare updated messages array
        const newMessages = [...messages, { role: 'user', content: input }];
        setLoading(true);

        try {
            const response = await fetch('https://codesensei-7hnk.onrender.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessages(prev => [...newMessages, { role: 'assistant', content: data.reply }]);
                setInput('');
                if (inputRef.current) inputRef.current.focus();
                setError('');
            } else {
                setError(data.error || 'Failed to get response');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if (inputRef.current) inputRef.current.focus();
    }, [messages, loading, chatEndRef, inputRef]);

    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 4, mt: 8, boxShadow: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
                    <ChatBubbleIcon sx={{ color: '#1976d2', fontSize: 40, mr: 1 }} /> Code Assistant Chatbot
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box sx={{ height: '60vh', overflow: 'auto', mb: 3 }}>
                    <List>
                        {messages.map((message, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    sx={{
                                        bgcolor: '#e6f4ff',
                                        mb: 1,
                                        borderRadius: 1,
                                        animation: 'fadeIn 0.4s',
                                    }}
                                >
                                    <Box display="flex" flexDirection="column" width="100%">
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: message.role === 'assistant' ? '#1976d2' : '#43a047', mb: 0.5 }}>
                                            {message.role === 'assistant' ? 'Assistant' : 'Me'}
                                        </Typography>
                                        <Box>
                                            {message.role === 'assistant' ? (
                                                <ReactMarkdown
                                                    children={message.content}
                                                    components={{
                                                        code({node, inline, className, children, ...props}) {
                                                            const match = /language-(\w+)/.exec(className || '');
                                                            const codeString = String(children).replace(/\n$/, '');
                                                            const handleCopy = () => navigator.clipboard.writeText(codeString);
                                                            const handleEdit = () => setInput(codeString);
                                                            return !inline ? (
                                                                <div style={{margin: '16px 0'}}>
                                                                    <div style={{marginBottom: 8, display: 'flex', justifyContent: 'flex-end'}}>
                                                                        <Button size="small" onClick={handleCopy} sx={{ mr: 1, color: '#333', backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}>Copy</Button>
                                                                        <Button size="small" onClick={handleEdit} sx={{ color: '#333', backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}>Edit</Button>
                                                                    </div>
                                                                    <SyntaxHighlighter
                                                                        style={oneLight}
                                                                        language={match ? match[1] : undefined}
                                                                        PreTag="div"
                                                                        customStyle={{
                                                                            background: '#fff',
                                                                            borderRadius: '6px',
                                                                            padding: '12px',
                                                                            fontSize: '1em',
                                                                            margin: 0,
                                                                        }}
                                                                        {...props}
                                                                    >
                                                                        {codeString}
                                                                    </SyntaxHighlighter>
                                                                </div>
                                                            ) : (
                                                                <code style={{background:'#e3f2fd',padding:'2px 4px',borderRadius:'4px'}} {...props}>{children}</code>
                                                            );
                                                        },
                                                        p({node, children, ...props}) {
                                                            return <div style={{margin: '8px 0', width: '100%'}} {...props}>{children}</div>;
                                                        },
                                                        pre({node, children, ...props}) {
                                                            return <div style={{width: '100%'}} {...props}>{children}</div>;
                                                        },
                                                        ul({node, children, ...props}) {
                                                            return <div style={{margin: '8px 0', width: '100%'}} {...props}>{children}</div>;
                                                        },
                                                        ol({node, children, ...props}) {
                                                            return <div style={{margin: '8px 0', width: '100%'}} {...props}>{children}</div>;
                                                        },
                                                        blockquote({node, children, ...props}) {
                                                            return <div style={{margin: '8px 0', width: '100%', borderLeft: '4px solid #1976d2', paddingLeft: 12, color: '#444'}} {...props}>{children}</div>;
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <Typography sx={{ color: '#000', whiteSpace: 'pre-wrap' }}>{message.content}</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                    
                    <div ref={chatEndRef} />
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder={loading ? "Generating..." : "Type your message here..."}
                        value={input}
                        disabled={loading}
                        inputRef={inputRef}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 1,
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2, 
                            color: '#fff', 
                            backgroundColor: '#1976d2', 
                            '&:hover': { 
                                backgroundColor: '#1565c0' 
                            } 
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Send Message'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Chatbot;

