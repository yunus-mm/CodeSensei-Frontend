import React from 'react';
import { Button, AppBar, Toolbar, Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ showSnackbar }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const onClick = () => setMenuOpen(false);
    if (menuOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('token'); // if you use tokens
        navigate('/login');
    };
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const initial = username ? username.charAt(0).toUpperCase() : '';
    return (
        <AppBar position="static" elevation={1} sx={{ mb: 4, background: '#e6f4ff', animation: 'fadeIn 0.5s' }}>
  <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative' }}>
  <Avatar
    sx={{ bgcolor: '#1976d2', width: 36, height: 36, mr: 1, fontWeight: 600, cursor: 'pointer', outline: 'none', transition: 'box-shadow 0.2s', '&:focus': { boxShadow: '0 0 0 2px #1976d2' } }}
    aria-label="User avatar"
    tabIndex={0}
    onClick={() => setMenuOpen(true)}
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setMenuOpen(true); }}
  >
    {initial}
  </Avatar>
  {menuOpen && (
    <Box sx={{ position: 'absolute', top: 45, left: 0, bgcolor: '#fff', boxShadow: 3, borderRadius: 2, minWidth: 120, zIndex: 10, animation: 'fadeIn 0.2s' }}>
      <Button fullWidth sx={{ justifyContent: 'flex-start', color: '#1976d2', px: 2 }} onClick={() => { setMenuOpen(false); showSnackbar && showSnackbar('Profile coming soon!', 'info'); }}>
        Profile
      </Button>
      <Button fullWidth sx={{ justifyContent: 'flex-start', color: '#d32f2f', px: 2 }} onClick={handleLogout} aria-label="Logout">
        Logout
      </Button>
    </Box>
  )}
</Box>
                    {isLoggedIn && username ? (
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#222' }}>
                            {username}
                        </Typography>
                    ) : (
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#222' }}>
                            Welcome! Please log in.
                        </Typography>
                    )}
                </Box>
                {isLoggedIn && (
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleLogout}
                        sx={{ ml: 2, color: '#1976d2', borderColor: '#1976d2' }}
                    >
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
