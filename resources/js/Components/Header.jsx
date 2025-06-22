import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import Link from '@mui/material/Link';
import { usePage, Link, router } from '@inertiajs/react';

const pages = [];
const settings = [
    {
        label: 'Dashboard',
        href: route('dashboard')
    },
    {
        label: 'Logout',
        href: route('logout'),
        method: 'post'
    },
];

const InertiaLinkAdapter = React.forwardRef(({ focusVisibleClassName, ...otherProps }, ref) => {
    return <Link {...otherProps} ref={ref} />;
  });

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function getInitials(name) {
    if (!name) return '?'; // Jika nama tidak ada
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function getSingleName(name) {
    if (!name) return '?'
    const names = name.split(' ')
    if (names.length < 1) {
        return '?'
    }
    return names[0]
}


function Header() {
    const {auth} = usePage().props;
    const dataUser = auth;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    const handleMenuClick = (item) => {
        handleCloseUserMenu(); // Selalu tutup menu setelah diklik
        if (item.method === 'post') {
            router.post(item.href);
        } else {
            router.get(item.href);
        }
    };

  return (
    <AppBar position="static" sx={{backgroundColor: "#f7f4ee"}} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#004c8c' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#004c8c',
              textDecoration: 'none',
            }}
          >
            Rutac SmallURL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            {
                dataUser.user ? (
                    <Box sx={{ flexGrow: 0 }}>
                        <span style={{
                            color: '#000',
                            margin: '1rem',
                            fontSize: '15px',
                            fontFamily: 'roboto',
                            letterSpacing: '0.5px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                            }}
                        >Hallo, {getSingleName(dataUser.user.name)}!</span>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                            <Avatar alt="Remy Sharp" sx={{ bgcolor: stringToColor(dataUser.user?.name) }}>
                                {getInitials(dataUser.user.name)}
                            </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                settings.map((setting) => {
                                    return (
                                        // <MenuItem
                                        //     key={setting.label}
                                        //     href={setting.href}
                                        //     component={InertiaLinkAdapter}
                                        //     method={setting.method || 'get'}
                                        //     as={setting.method === 'post' ? 'button' : 'a'}
                                        //     onClick={setting.label !== 'Logout' ? handleCloseUserMenu : null}
                                        // >
                                        //     <Typography textAlign="center">{setting.label}</Typography>
                                        // </MenuItem>
                                        <MenuItem
                                        key={setting.label}
                                        onClick={() => handleMenuClick(setting)}
                                        >
                                            <Typography textAlign="center">{setting.label}</Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </Box>
                ) : (
                    <Button variant="outlined" component={Link} href={route('register')} size="small" sx={{py: '6px', px: 3, whiteSpace: 'nowrap'}}>
                        Create Account
                    </Button>
                )
            }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
