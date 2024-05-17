import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Process() {
  return (
    <Box sx={{ display: 'flex', marginTop:'20px', justifyContent:'center' }}>
      <CircularProgress />
    </Box>
  );
}