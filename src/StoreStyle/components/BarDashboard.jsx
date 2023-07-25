import { Box, AppBar, Toolbar, Typography } from "@mui/material";

export const BarDashboard = () => {


  return (
    <AppBar component="nav" color="inherit">
    <Toolbar>
    <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 145,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'grey',
              textDecoration: 'none',
            }}
          >
            StyleStore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              ml: 30,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'grey',
              textDecoration: 'none',
            }}
          >
            StyleStore
          </Typography>
    </Toolbar>
  </AppBar>
  )
}

