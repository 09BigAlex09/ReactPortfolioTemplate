import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Style from './Contact.module.scss';

export default function Contact({ innerRef, darkMode }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <Box
            ref={innerRef}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            id="contact"
            className={darkMode ? Style.dark : Style.light}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: '1rem',
                    background: darkMode
                        ? 'linear-gradient(135deg, #232323 80%, #2e2e3a 100%)'
                        : 'linear-gradient(135deg, #f8f8f8 80%, #eae6f7 100%)',
                    color: darkMode ? '#f8f8f8' : '#1f1f1f'
                }}
                className={Style.shadowed}
            >
                <Typography variant="h4" gutterBottom align="center" sx={{ color: darkMode ? '#8D53FF' : '#8D53FF' }}>
                    Contact Me
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ style: { color: darkMode ? '#CA6BE6' : '#1f1f1f' } }}
                        InputProps={{
                            style: {
                                color: darkMode ? '#f8f8f8' : '#1f1f1f',
                                background: darkMode ? '#232323' : '#fff'
                            }
                        }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ style: { color: darkMode ? '#CA6BE6' : '#1f1f1f' } }}
                        InputProps={{
                            style: {
                                color: darkMode ? '#f8f8f8' : '#1f1f1f',
                                background: darkMode ? '#232323' : '#fff'
                            }
                        }}
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                        InputLabelProps={{ style: { color: darkMode ? '#CA6BE6' : '#1f1f1f' } }}
                        InputProps={{
                            style: {
                                color: darkMode ? '#f8f8f8' : '#1f1f1f',
                                background: darkMode ? '#232323' : '#fff'
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            background: darkMode ? '#8D53FF' : '#8D53FF',
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '2rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                            '&:hover': {
                                background: '#169c2a'
                            }
                        }}
                    >
                        Send
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

