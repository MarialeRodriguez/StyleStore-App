import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';

import { lightTheme } from './lightTheme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}