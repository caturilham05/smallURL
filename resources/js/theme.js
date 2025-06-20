import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // Mode bisa 'light' atau 'dark'
    mode: 'light',

    // Di sinilah kita mendefinisikan warna background
    background: {
      default: '#f7f4ee', // Contoh: Warna abu-abu sangat muda
    //   paper: '#ffffff', // Warna untuk komponen seperti <Paper> atau <Card>
    },

    // Anda juga bisa mendefinisikan warna utama di sini
    // primary: {
    //   main: '#556cd6',
    // },
    // secondary: {
    //   main: '#19857b',
    // },
    // ... warna lainnya
  },
});

export default theme;
