import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function GlobalLoader({ open }) {
  return (
    <Backdrop sx={{ color: '#1976d2', zIndex: (theme) => theme.zIndex.drawer + 200 }} open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
