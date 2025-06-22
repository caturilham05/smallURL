import React, {useState} from 'react'
import axios from 'axios'
import { Container, Typography, TextField, Button, Box, CircularProgress, Alert, Link as MuiLink, Paper } from '@mui/material'
import { Head } from '@inertiajs/react'
import Header from '@/Components/Header'
import Link from '@mui/material/Link';

// 1. Definisikan data fitur dalam sebuah array
const features = [
    {
      icon: '/images/icon-like.png', // Ganti dengan path ikon Anda
      title: 'Easy',
      description: 'ShortURL is easy and fast, enter the long link to get your shortened link.'
    },
    {
      icon: '/images/icon-url.png',
      title: 'Shortened',
      description: 'Use any link, no matter how long it is. We handle it.'
    },
    {
      icon: '/images/icon-secure.png',
      title: 'Secure',
      description: 'It is fast and secure. We do not store any sensitive data.'
    },
    {
      icon: '/images/icon-statistics.png',
      title: 'Statistics',
      description: 'Check the number of clicks that your shortened URL received.'
    },
    {
      icon: '/images/icon-unique.png',
      title: 'Reliable',
      description: 'All links that try to disseminate spam, viruses and malware are deleted.'
    },
    {
      icon: '/images/icon-responsive.png',
      title: 'Devices',
      description: 'Compatible with smartphones, tablets and desktop.'
    }
];

// Buat komponen baru yang berisi layout section ini
function FeaturesSection() {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}> {/* py = padding atas & bawah */}

        {/* (Opsional) Judul untuk section ini */}
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Awesome Features
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 8 }}>
          Discover why our URL shortener is the best choice for you.
        </Typography>

        {/* Grid Container */}
        <Box sx={{
          display: 'grid',
          // Responsif: 1 kolom di HP, 2 di tablet, 3 di desktop
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 5, // Jarak antar item
        }}>
          {/* 2. Gunakan .map() untuk me-render setiap fitur secara otomatis */}
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',          // Jadikan flex container
                flexDirection: 'column',   // Susun item secara vertikal
                alignItems: 'center',      // Tengahkan item secara horizontal
                textAlign: 'center',      // Tengahkan teks (fallback jika flex gagal)
              }}
            >
              <Box
                component="img"
                src={feature.icon}
                alt={`${feature.title} icon`}
                sx={{ height: 70, width: 70, mb: 2 }}
              />
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'medium' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    );
}

function HomePage({auth}) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shortenedUrl, setShortenedUrl] = useState(null);
    const currentDate = new Date();
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setShortenedUrl('');

        try {
            const body = { original_url : url, user_id : auth.user?.id ?? null};
            const response = await axios.post('/api/shorten', body);
            setShortenedUrl(response.data.result);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Header/>
            <Head title="Free URL Shortener" />
            <Container maxWidth="lg" sx={{p: 4}}>
                <Typography variant="h2"  component="h1" align="center" gutterBottom sx={{fontSize: '40px', fontWeight: 'bold'}}>
                    Best Free URL Shortener: Track & Optimize Links
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{mb: 4, fontSize: '17px'}}>
                    Shorten links for free. Create short & memorable links in seconds.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <TextField
                        fullWidth
                        label="Enter a long URL"
                        variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={loading}
                        sx={{
                            backgroundColor: "#fff",
                            flexGrow: 1,
                        }}
                    />
                    <Button type="submit" variant="contained" size="medium" disabled={loading || !url} sx={{py: '15px', px: 7, whiteSpace: 'nowrap'}}>
                        {loading ? <CircularProgress size={24}/> : "Shorten URL"}
                    </Button>
                </Box>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{mb: 3, mt: 3, fontSize: '17px'}}>
                    By clicking Shorten URL, you agree to Terms of Use, Privacy Policy and Cookie Policy
                </Typography>
                {error && (
                    <Alert severity='error' variant='filled' sx={{mt: 3}}>
                        {error}
                    </Alert>
                )}
                {
                    shortenedUrl && (
                        <Box sx={{mt: 4, p: 2, backgroundColor: 'grey.300', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2}}>
                            <Typography variant='body1'>Your Shortened URL : </Typography>
                            <MuiLink href={shortenedUrl.short_url} target="_blank" rel="noopener norefferer" variant='h6'>{shortenedUrl.short_url}</MuiLink>
                        </Box>
                    )
                }

                <Paper elevation={0} sx={{p:4, borderRadius: 2, mt: 3, backgroundColor: 'grey.300'}}>
                    <Typography align="center" gutterBottom sx={{fontSize: '25px', fontWeight: 'bold'}}>
                        Shorten, brand, and convert more links!
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" sx={{mb: 1, mt: 1, fontSize: '17px'}}>
                        Create an account to shorten links, generate QR codes, create a link-in-bio hub, and more.
                    </Typography>
                    {
                        !auth.user && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                mt: 3 // (Opsional) Memberi sedikit jarak di atasnya
                            }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="medium"
                                    sx={{
                                        py: '15px',
                                        px: 5,
                                        whiteSpace: 'nowrap'
                                    }}
                                    component={Link}
                                    href={route('register')}
                                >
                                    Start For Free
                                </Button>
                            </Box>
                        )
                    }
                </Paper>
            </Container>
            <Box
                sx={{
                    width: '100%',          // 1. Mengambil lebar penuh layar
                    py: 8,                  // 2. Padding atas & bawah (py = padding y-axis)
                    backgroundColor: '#004c8c' // 3. Warna background biru tua
                }}
            >
                <Container maxWidth="md" sx={{pb: 3}}>
                    <Typography color='white' align='center' gutterBottom sx={{fontSize: '25px', fontWeight: 'bold', mb: 2}}>
                        A fast, easy, and free link shortener
                    </Typography>
                    <Typography variant="subtitle1" color="white" align='justify' sx={{mb: 1, mt: 1, fontSize: '17px'}}>
                        Use this free URL shortener to change long, ugly links into memorable and trackable short URLs. The best free and very no pricing link shortener alternative to Bitly, Tinyurl, and Google link shorteners. Free short links for any social media platform, website, SMS, email, ads, and more. Generate short links for Instagram, LinkedIn, Facebook, X, TikTok and more.
                    </Typography>
                    <Typography color='white' align='center' gutterBottom sx={{fontSize: '25px', fontWeight: 'bold', mb: 2, mt: 3}}>
                        Shorten, share and track
                    </Typography>
                    <Typography variant="subtitle1" color="white" align='justify' sx={{fontSize: '17px'}}>
                        Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and other locations. Track statistics for your business and projects by monitoring the number of hits from your URL with our click counter.
                    </Typography>
                </Container>
            </Box>

            <FeaturesSection />

            <Box
                sx={{
                    width: '100%',          // 1. Mengambil lebar penuh layar
                    py: 3,                  // 2. Padding atas & bawah (py = padding y-axis)
                    backgroundColor: '#004c8c', // 3. Warna background biru tua
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="subtitle1" color="white" align='center' sx={{fontSize: '17px'}}>
                        &copy; Copyright {currentDate.getFullYear()}, {appName}. All Right Reserved.
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default HomePage
