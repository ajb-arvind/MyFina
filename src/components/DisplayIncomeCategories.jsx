import { Box, Grid, Button, Typography } from '@mui/material';
import CommonCategoryList from './CommonCategoryList';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { storeUpdatedUsersList } from '../redux/features/user/userSlice';

const INCOME_CATEGORIES = 'Income Categories';
const INCOME_SUB_CATEGORIES = 'Income Sub Categories';

const DisplayIncomeCategories = () => {
  const { user } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const getAllCategoriesList = () => {
    let categoriesList = [];
    for (const [key, value] of Object.entries(user.incomeCategories)) {
      if (value.isCategory) categoriesList.push(key);
    }
    return categoriesList;
  };

  //Category List
  const categoriesList = getAllCategoriesList();

  //Selected Category
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoriesList[0]
  );

  //Sub Category List
  const subCategoriesList =
    user.incomeCategories[selectedCategoryId]?.subCategory;

  const handleSaveAllChanges = async () => {
    if (confirm('Are you sure to confirm your changes')) {
      try {
        const docRef = doc(db, 'users', user.userId);
        await updateDoc(docRef, {
          incomeCategories: user.incomeCategories,
        });
        alert('SUCCESS! Accounts & Categories Successfully saved');
      } catch (error) {
        alert('ERROR!', error.message);
        console.log(error);
      }
      //TODO: CheckUpdated IncomeCategories
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
      <Grid container spacing={{ sm: 2 }} px={{ xs: 0, sm: 5 }}>
        <Grid item xs={12} sm={6}>
          {categoriesList?.length > 0 && (
            <CommonCategoryList
              title={INCOME_CATEGORIES}
              list={categoriesList}
              data={user.incomeCategories}
              onClickCategory={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
              isEdit={isEdit}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommonCategoryList
            title={INCOME_SUB_CATEGORIES}
            list={subCategoriesList}
            data={user.incomeCategories}
            selectedCategoryId={selectedCategoryId}
            isEdit={isEdit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DisplayIncomeCategories;
