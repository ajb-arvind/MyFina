import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  createTheme,
} from '@mui/material';
import {
  CategoryWisePieChart,
  BalanceDisplay,
  DateSelection,
} from '../components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { decrypt } from '../misc/encrypt';
import dayjs from 'dayjs';

const defaultTheme = createTheme();
const Stats = () => {
  const userId = useSelector((state) => state.user.user.userId);
  const [transactionList, setTransactionList] = useState([]);

  const [dateSelection, setDateSelection] = useState({
    fromDate: dayjs().startOf('month'),
    toDate: dayjs().endOf('month'),
  });

  const formDate = new Date(dateSelection.fromDate);

  const getTransactionList = async () => {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      where('date', '>=', dayjs(dateSelection.fromDate).format('YYYY-MM-DD')),
      where('date', '<=', dayjs(dateSelection.toDate).format('YYYY-MM-DD'))
    );

    const querySnapshot = await getDocs(q);
    let list = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.note = decrypt(data.note);
      list.push(data);
    });
    setTransactionList(list.sort((a, b) => b.createdAt - a.createdAt));
  };

  useEffect(() => {
    getTransactionList();
  }, [transactionList]);

  const incomeTransactionList = transactionList.filter(
    (transaction) => transaction.type === 'income'
  );

  let incomeTotal = 0;
  incomeTransactionList.forEach((item) => {
    incomeTotal += item.amount;
  });

  const expenseTransactionList = transactionList.filter(
    (transaction) => transaction.type === 'expense'
  );

  let expenseTotal = 0;
  expenseTransactionList.forEach((item) => {
    expenseTotal += item.amount;
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              overflow: 'auto',
            }}
          ></Box>
        </Box>
        <Container maxWidth="xl" style={{ height: '90vh' }}>
          <Grid
            container
            rowSpacing={{ xs: 2, md: 1 }}
            columnSpacing={{ xs: 0, md: 2 }}
            paddingTop={2}
          >
            <DateSelection
              dateSelection={dateSelection}
              setDateSelection={setDateSelection}
            />
            <Grid item xs={12} marginTop={2} marginBottom={2}>
              <BalanceDisplay
                incomeTotal={incomeTotal}
                expenseTotal={expenseTotal}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, display: 'flex', overflowX: 'scroll' }}>
                <CategoryWisePieChart transactionList={incomeTransactionList} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, display: 'flex', overflowX: 'scroll' }}>
                <CategoryWisePieChart
                  transactionList={expenseTransactionList}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Stats;
