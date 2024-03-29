import * as React from 'react';
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

import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/features/user/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';

import AppLogo from '../assets/MyFina.png';
import { deepOrange } from '@mui/material/colors';
import { Paper } from '@mui/material';

const pages = [
  { label: 'DashBoard', url: '/home' },
  { label: 'Transactions', url: '/transactions' },
  { label: 'Stats', url: '/stats' },
];
const settings = [
  {
    label: 'Profile',
    url: '/profile',
  },
  {
    label: 'Log Out',
  },
];
const NavbarFinance = () => {
  const user = useSelector((state) => state.user?.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Paper sx={{ m: 1 }}>
            {' '}
            <Box
              component="img"
              src={AppLogo}
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: 150,
                height: 50,
                cursor: 'pointer',
                mx: 2,
                my: 0.3,
              }}
              onClick={() => navigate('/home')}
            />
          </Paper>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {isLogin && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.label}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(page.url);
                      }}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Paper sx={{ m: 1 }}>
              <Box
                component="img"
                src={AppLogo}
                sx={{
                  width: 150,
                  height: 50,
                  cursor: 'pointer',
                  mx: 2,
                }}
                onClick={() => navigate('/home')}
              />
            </Paper>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLogin &&
              pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => navigate(page.url)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogin ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} sx={{ bgcolor: deepOrange[500] }}>
                      {user.name.match(/\b(\w)/g).join('')}
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
                  {settings.map((setting, index) => {
                    const isLastItem = index === settings.length - 1;
                    return (
                      <MenuItem
                        key={setting.label}
                        onClick={() => {
                          isLastItem ? handleLogout() : handleCloseUserMenu();
                          navigate(setting.url);
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            ) : (
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
            {/* TODO: add login and register  */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarFinance;
