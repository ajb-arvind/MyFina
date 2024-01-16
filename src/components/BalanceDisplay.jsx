import { useTheme } from '@emotion/react';
import { Box, Divider, Paper, Typography } from '@mui/material';

const BalanceDisplay = ({ incomeTotal, expenseTotal }) => {
  const theme = useTheme();
  return (
    <Box
      component="div"
      sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}
    >
      <Paper
        sx={{
          px: 3,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 100,
          gap: 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: -1 }}
          color={theme.palette.success.light}
        >
          {incomeTotal}
        </Typography>
        <Divider light flexItem />
        <Typography variant="subtitle1">INCOME</Typography>
      </Paper>
      <Paper
        sx={{
          px: 3,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 100,
          gap: 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: -1 }}
          color={theme.palette.error.light}
        >
          {expenseTotal}
        </Typography>
        <Divider light flexItem />
        <Typography variant="subtitle1">EXPENSE</Typography>
      </Paper>
      <Paper
        sx={{
          px: 3,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 100,
          gap: 0,
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: -1 }}
          color={theme.palette.info.light}
        >
          {incomeTotal - expenseTotal}
        </Typography>
        <Divider light flexItem />
        <Typography variant="subtitle1">BALANCE</Typography>
      </Paper>
    </Box>
  );
};
export default BalanceDisplay;
