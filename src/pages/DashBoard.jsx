import * as React from 'react';
import {
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Link,
} from '@mui/material';

import { IncomeExpenseChart, Deposits, Orders } from '../components';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MyFinance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const DashBoard = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 2, ml: 1 }}>
            <Grid
              container
              columnSpacing={{ md: 2 }}
              rowSpacing={{ xs: 2, md: 0 }}
              direction={{ xs: 'column-reverse', md: 'row' }}
            >
              <Grid
                container
                rowSpacing={{ xs: 2 }}
                xs={12}
                md={8}
                direction="column"
              >
                {/* Chart */}
                <Grid item>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <IncomeExpenseChart />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default DashBoard;
