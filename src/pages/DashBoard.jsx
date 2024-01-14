import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Container, Grid, Paper } from '@mui/material';

// import {
//   IncomeExpenseChart,
//   NewTransaction,
//   TransactionHistory,
//   Copyright,
// } from '../components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  IncomeExpenseChart,
  NewTransaction,
  TransactionHistory,
  Copyright,
} from '../components';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);
  return null;
  // try {
  //   const transactionId = uuidv4();
  //   await setDoc(doc(db, 'transactions', transactionId), {
  //     account: data.account,
  //     amount: Number(data.amount),
  //     category: data.category,
  //     date: data.date,
  //     note: encrypt(data.note),
  //     subCategory: data.subCategory,
  //     type: data.type,
  //     userId: store.getState()?.user?.user?.userId,
  //     createdAt: Date.now(),
  //     transactionId,
  //   });

  //   alert('Success!');

  //   return null;
  // } catch (error) {
  //   alert('Error!', error.message);
  //   return null;
  // }
};

const DashBoard = () => {
  const userId = useSelector((state) => state.user.user.userId);
  const [transactionList, setTransactionList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const getTransactionList = async () => {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    let list = [];
    let chartList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push(data);
      const month = data.date.split('-')[1];
      const index = chartList.findIndex((item) => item.name == month);
      if (index === -1) {
        chartList.push({
          name: month,
          income: data.type == 'income' ? data.amount : 0,
          expense: data.type == 'expense' ? data.amount : 0,
        });
      } else {
        let obj = {
          name: month,
          income:
            chartList[index].income + (data.type == 'income' ? data.amount : 0),
          expense:
            chartList[index].expense +
            (data.type == 'expense' ? data.amount : 0),
        };
        chartList[index] = obj;
      }
    });
    setTransactionList(list);
    setChartData(chartList);
  };

  useEffect(() => {
    getTransactionList();
  }, []);
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
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid
              container
              columnSpacing={{ md: 2 }}
              rowSpacing={{ xs: 2, md: 0 }}
              sx={{ ml: 1 }}
              direction={{ xs: 'column-reverse', md: 'row' }}
            >
              <Grid
                item
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
                    <IncomeExpenseChart chartData={chartData} />
                  </Paper>
                </Grid>
                {/* Recent TransactionHistory */}
                <Grid item>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <TransactionHistory transactionList={transactionList} />
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
                  <NewTransaction />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 1 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default DashBoard;
