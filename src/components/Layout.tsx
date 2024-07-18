import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline, Link } from '@mui/material';

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black', color: 'white' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Link href="/" color="inherit" sx={{ ml: 2, mr: 5 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CuroLabs Test by Russel
            </Typography>
          </Link>
          <Link href="/account" color="inherit" sx={{ ml: 2 }}>
            Accounts
          </Link>
          <Link href="/chart" color="inherit" sx={{ ml: 2 }}>
            Area Chart
          </Link>
          <Link href="/metrics" color="inherit" sx={{ ml: 2 }}>
            Metrics
          </Link>
          <Link href="/prices" color="inherit" sx={{ ml: 2 }}>
            Current Prices
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
