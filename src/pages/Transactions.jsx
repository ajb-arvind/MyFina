import { ThemeProvider } from '@emotion/react';
import { Box, Container, createTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const defaultTheme = createTheme();

const columns = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  {
    field: 'subCategory',
    headerName: 'Sub Category',
    flex: 1,
  },
  {
    field: 'account',
    headerName: 'Account',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    type: 'number',
  },
  {
    field: 'note',
    headerName: 'Note',
    flex: 1,
    sortable: false,
  },
];

const Transactions = () => {
  const userId = useSelector((state) => state.user.user.userId);
  const [transactionList, setTransactionList] = useState([]);
  const getTransactionList = async () => {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    let list = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push(data);
    });
    setTransactionList(list.sort((a, b) => b.createdAt - a.createdAt));
  };

  useEffect(() => {
    getTransactionList();
  }, []);

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
          >
            <Container style={{ height: '90vh' }}>
              <DataGrid
                rows={transactionList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                getRowId={(row) => row.transactionId}
              />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default Transactions;
