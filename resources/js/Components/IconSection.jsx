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
function IconSection() {
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
                sx={{ height: 60, width: 60, mb: 2 }}
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

export default IconSection
