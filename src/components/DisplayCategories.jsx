import { Box, Grid, Button, Typography } from '@mui/material';

import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { useSelector } from 'react-redux';
import CommonCategoryList from './CommonCategoryList';

const CATEGORIES = 'Categories';
const SUB_CATEGORIES = 'Sub Categories';

const DisplayCategories = () => {
  const { user } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  const getAllCategoriesList = () => {
    let categoriesList = [];
    for (const [key, value] of Object.entries(user.categories)) {
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
  const subCategoriesList = user.categories[selectedCategoryId]?.subCategory;

  const handleSaveAllChanges = async () => {
    if (confirm('Are you sure to confirm your changes')) {
      try {
        const docRef = doc(db, 'users', user.userId);
        await updateDoc(docRef, {
          categories: user.categories,
        });
        alert('SUCCESS! Accounts & Categories Successfully saved');
      } catch (error) {
        alert('ERROR!', error.message);
        console.log(error);
      }
    } else {
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
              title={CATEGORIES}
              list={categoriesList}
              data={user.categories}
              onClickCategory={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
              isEdit={isEdit}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommonCategoryList
            title={SUB_CATEGORIES}
            list={subCategoriesList}
            data={user.categories}
            selectedCategoryId={selectedCategoryId}
            isEdit={isEdit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DisplayCategories;
