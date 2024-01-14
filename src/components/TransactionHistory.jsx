import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Grid } from '@mui/material';
import { decrypt } from '../misc/encrypt';
import { limitStringDisplay } from '../misc/Utils';

function preventDefault(event) {
  event.preventDefault();
}

export default function TransactionHistory({ transactionList }) {
  return (
    <React.Fragment>
      <Title>Recent Transaction</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionList.map((item) => {
            return (
              <TableRow
                sx={{ textTransform: 'capitalize' }}
                key={item.createdAt}
              >
                <TableCell>{item?.date}</TableCell>
                <TableCell>{item?.type}</TableCell>
                <TableCell>{item?.category}</TableCell>
                <TableCell>{item?.subCategory}</TableCell>
                <TableCell> {item?.amount}</TableCell>
                <TableCell>
                  {limitStringDisplay(decrypt(item?.note), 15)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Grid container justifyContent="flex-end">
        <Link color="primary" href="/transactions" sx={{ mt: 3 }}>
          See more transactions
        </Link>
      </Grid>
    </React.Fragment>
  );
}
