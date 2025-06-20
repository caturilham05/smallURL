import React, {useState} from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button, Box, CircularProgress, Alert, Paper, Link as MuiLink } from '@mui/material'
import { Head } from '@inertiajs/react'

function HomePage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shortenedUrl, setShortenedUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setShortenedUrl('');

        try {
            const body = { original_url : url };
            const response = await axios.post('/api/shorten', body);
            setShortenedUrl(response.data.result);
        } catch (error) {
            setError(error.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Head title="URL Shortener" />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h4"  component="h1" align="center" gutterBottom>
                        URL Shortener
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" sx={{mb: 4}}>
                        Simple, Fast and Powerful
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            label="Enter a long URL"
                            variant="outlined"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />
                        <Button type="submit" fullWidth variant="contained" size="large" disable={loading || !url}>
                            {loading ? <CircularProgress /> : "Shorten!"}
                        </Button>
                    </Box>
                    {error && (
                        <Alert severity='error' sx={{mt: 3}}>
                            {error}
                        </Alert>
                    )}

                    {
                        shortenedUrl && (
                            <Box sx={{mt: 4, p: 2, backgroundColor: 'grey.100', borderRadius: 1}}>
                                <Typography variant='body1'>Your Shortened URL : </Typography>
                                <MuiLink href={shortenedUrl.short_url} target="_blank" rel="noopener norefferer" variant='h6'>{shortenedUrl.short_url}</MuiLink>
                            </Box>
                        )
                    }
                </Paper>
            </Container>
        </>
    )
}

export default HomePage
