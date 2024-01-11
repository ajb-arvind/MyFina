import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import { useState } from 'react';
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { store } from '../redux/store';
import {
  pushToAccounts,
  pushToCategories,
  updateAccounts,
  updateCategories,
  updateCheckbox,
  updateSubCategories,
} from '../redux/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const CATEGORIES = 'Categories';
const SUB_CATEGORIES = 'Sub Categories';
const ACCOUNTS = 'Accounts';

const CommonCategory = ({
  id,
  data,
  selectedCategoryId,
  onClickCategory,
  onClickCheckbox,
  handleDeleteCategory,
  isEdit,
}) => {
  const currentCategories = data[id];
  return (
    <ListItem
      sx={[
        selectedCategoryId === id && {
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: 'white',
        },
        { borderRadius: 2 },
      ]}
    >
      {isEdit && (
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={currentCategories?.isEnabled}
            onChange={onClickCheckbox}
          />
        </ListItemIcon>
      )}
      <ListItemText
        primary={currentCategories?.label}
        onClick={onClickCategory}
        sx={[currentCategories.isCategory && { cursor: 'pointer' }]}
      />
      {isEdit && (
        <IconButton>
          <DeleteIcon onClick={handleDeleteCategory} />
        </IconButton>
      )}
    </ListItem>
  );
};

const CommonCategoryList = ({
  title,
  list,
  data,
  selectedCategoryId,
  onClickCategory,
  isEdit,
}) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handlePushToData = () => {
    if (title != ACCOUNTS && inputValue !== '') {
      title === CATEGORIES &&
        dispatch(pushToCategories({ inputValue, isCategory: true }));
      title === SUB_CATEGORIES &&
        dispatch(
          pushToCategories({
            inputValue,
            isCategory: false,
            selectedCategoryId,
          })
        );
    }
    if (title === ACCOUNTS) {
      dispatch(pushToAccounts(inputValue));
    }
    setInputValue('');
  };

  const toggleCheckbox = (id) => {
    title === ACCOUNTS && dispatch(updateCheckbox({ type: 'accounts', id }));
    title != ACCOUNTS && dispatch(updateCheckbox({ type: 'categories', id }));
  };

  const handleDeleteFromData = (id) => {
    if (confirm(`Are sure to delete the ${data[id].value}`)) {
      title === ACCOUNTS && dispatch(updateAccounts(id));
      title === SUB_CATEGORIES &&
        dispatch(
          updateSubCategories({ parentId: selectedCategoryId, childId: id })
        );

      title === CATEGORIES && dispatch(updateCategories(id));
    }
  };

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <Title> {title}</Title>
        {list?.length > 0 &&
          list.map((id) => {
            return (
              <CommonCategory
                key={id}
                id={id}
                data={data}
                selectedCategoryId={selectedCategoryId}
                onClickCategory={() =>
                  title === CATEGORIES && onClickCategory(id)
                }
                onClickCheckbox={() => toggleCheckbox(id)}
                handleDeleteCategory={() => handleDeleteFromData(id)}
                isEdit={isEdit}
              />
            );
          })}
      </List>
      {isEdit && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 360,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            p: 2,
          }}
        >
          <TextField
            variant="outlined"
            label="Add Category"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="outlined" onClick={handlePushToData}>
            <CheckIcon />
          </Button>
        </Box>
      )}
    </>
  );
};

const DisplayCategories = () => {
  const { user } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  console.log(user);

  const getAllCategoriesList = () => {
    let categoriesList = [];
    for (const [key, value] of Object.entries(user.categories)) {
      if (value.isCategory) categoriesList.push(key);
    }
    return categoriesList;
  };

  //accountList
  const accountList = Object.keys(user.accounts);
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
      const userId = store.getState()?.user?.user?.userId;

      try {
        const docRef = doc(db, 'users', user.userId);
        await updateDoc(docRef, {
          categories: user.categories,
          accounts: user.accounts,
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
        sx={{ my: 4, display: 'flex', gap: 1, alignItems: 'center' }}
      >
        <Typography>
          {isEdit ? 'Save all the changes' : 'Edit Categories'}
        </Typography>
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
          title="Accounts"
          list={accountList}
          data={user.accounts}
          isEdit={isEdit}
        />
      </Grid>

      <Grid container spacing={{ sm: 2 }} px={{ xs: 0, sm: 5 }}>
        <Grid item xs={12} sm={6}>
          {categoriesList?.length > 0 && (
            <CommonCategoryList
              title="Categories"
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
            title="Sub Categories"
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
