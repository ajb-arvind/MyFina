import { Box, Grid, Button, Typography } from '@mui/material';

import CommonCategoryList from './CommonCategoryList';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { storeUpdatedUsersList } from '../redux/features/user/userSlice';

const ACCOUNTS = 'Accounts';

const DisplayAccounts = () => {
  const { user } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
   const dispatch = useDispatch();

  //accountList
  const accountList = Object.keys(user.accounts);

  const handleSaveAllChanges = async () => {
    if (confirm('Are you sure to confirm your changes')) {
      try {
        const docRef = doc(db, 'users', user.userId);
        await updateDoc(docRef, {
          accounts: user.accounts,
        });
        alert('SUCCESS! Accounts & Categories Successfully saved');
      } catch (error) {
        alert('ERROR!', error.message);
        console.log(error);
      }
    } else {
      const docRef = doc(db, 'users', user.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let user = docSnap.data();
        dispatch(storeUpdatedUsersList(user));
      }
    }
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          onClick={() => {
            if (isEdit) {
              handleSaveAllChanges();
            }
            setIsEdit(!isEdit);
          }}
        >
          {isEdit ? 'Save All' : 'Edit'}
        </Button>
      </Grid>
      <Grid px={{ xs: 0, sm: 5 }}>
        <CommonCategoryList
          title={ACCOUNTS}
          list={accountList}
          data={user.accounts}
          isEdit={isEdit}
        />
      </Grid>
    </Box>
  );
};
export default DisplayAccounts;
