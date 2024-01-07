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
} from '@mui/material';

import { useState } from 'react';
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { store } from '../redux/store';
import {
  updateAccounts,
  updateCategories,
} from '../redux/features/user/userSlice';

const CategoryComponent = ({
  category,
  onClickCategory,
  isSelected,
  onClickCheckbox,
  handleDeleteCategory,
  selectedCategory,
}) => {
  return (
    <div>
      <ListItem
        onClick={onClickCategory}
        sx={[
          selectedCategory?.value === category && {
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: 'white',
          },
          { borderRadius: 2 },
        ]}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isSelected}
            onChange={onClickCheckbox}
          />
        </ListItemIcon>
        <ListItemText primary={category} />
        <DeleteIcon onClick={handleDeleteCategory} />
      </ListItem>
    </div>
  );
};

const SubCategoryComponent = ({
  subcategory,
  isSelected,
  onClickCheckbox,
  handleDeleteSubCategory,
}) => {
  return (
    <ListItem sx={{ borderRadius: 2 }}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={isSelected}
          onChange={onClickCheckbox}
        />
      </ListItemIcon>
      <ListItemText primary={subcategory} />
      <DeleteIcon onClick={handleDeleteSubCategory} />
    </ListItem>
  );
};

const AccountComponent = ({
  account,
  isSelected,
  onClickCheckbox,
  handleDeleteAccount,
}) => {
  return (
    <ListItem sx={{ borderRadius: 2 }}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={isSelected}
          onChange={onClickCheckbox}
        />
      </ListItemIcon>
      <ListItemText primary={account} sx={{ textTransform: 'capitalize' }} />
      <DeleteIcon onClick={handleDeleteAccount} />
    </ListItem>
  );
};

const CategoryListEdit = ({ categoriesData, accountsData, setIsEdit }) => {
  const [categories, setCategories] = useState(categoriesData);
  const [accounts, setAccounts] = useState(accountsData);

  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);

  const [inputCategories, setInputCategories] = useState('');
  const [inputSubCategories, setInputSubCategories] = useState('');
  const [inputAccounts, setInputAccounts] = useState('');

  const toggleCheckboxCategory = (category) => {
    const newCategories = categories.map((item) =>
      item.value !== category.value
        ? item
        : { ...item, isEnabled: !item.isEnabled }
    );

    setCategories(newCategories);
  };

  const toggleCheckboxSubCategory = (subCategory) => {
    const newCategories = categories.map((item) =>
      item?.value === selectedCategory?.value
        ? {
            ...item,
            subCategory: item?.subCategory?.map((itemSubCategory) =>
              itemSubCategory.value !== subCategory.value
                ? itemSubCategory
                : { ...itemSubCategory, isEnabled: !itemSubCategory.isEnabled }
            ),
          }
        : item
    );
    setCategories(newCategories);
  };
  const toggleCheckboxAccount = (account) => {
    const newAccounts = accounts.map((item) =>
      item.value !== account.value
        ? item
        : { ...item, isEnabled: !item.isEnabled }
    );
    setAccounts(newAccounts);
  };

  const handleDeleteCategory = (category) => {
    if (confirm(`Are sure to delete the ${category.value}`)) {
      const newCategories = categories.filter(
        (item) => item.value !== category.value
      );
      setCategories(newCategories);
    }
  };
  const handleDeleteSubCategory = (subCategory) => {
    const newCategories = categories.map((item) =>
      item?.value === selectedCategory?.value
        ? {
            ...item,
            subCategory: item?.subCategory?.filter(
              (itemSubCategory) => itemSubCategory.value !== subCategory.value
            ),
          }
        : item
    );

    setCategories(newCategories);
  };
  const handleDeleteAccount = (account) => {
    if (confirm(`Are sure to delete the ${account.value}`)) {
      const newAccounts = accounts.filter(
        (item) => item.value !== account.value
      );
      setAccounts(newAccounts);
    }
  };

  const handlePushInputCategory = () => {
    if (
      inputCategories !== '' &&
      !categories.some((item) => item.value === inputCategories)
    ) {
      setCategories([
        ...categories,
        {
          isEnabled: true,
          value: inputCategories,
          label: inputCategories,
          subCategory: [],
        },
      ]);
    }

    setInputCategories('');
  };

  const handlePushInputSubCategory = () => {
    if (
      inputSubCategories !== '' &&
      !categories
        .find((item) => item?.value === selectedCategory?.value)
        ?.subCategory.some(
          (itemSubCategory) => itemSubCategory.value === inputSubCategories
        )
    ) {
      const newCategories = categories.map((item) =>
        item?.value === selectedCategory?.value
          ? {
              ...item,
              subCategory: [
                ...item.subCategory,
                {
                  isEnabled: true,
                  value: inputSubCategories,
                  label: inputSubCategories,
                },
              ],
            }
          : item
      );

      setCategories(newCategories);
    }
    setInputSubCategories('');
  };

  const handlePushInputAccounts = () => {
    if (
      inputAccounts !== '' &&
      !accounts.some((item) => item.value === inputAccounts)
    ) {
      setAccounts([
        ...accounts,
        {
          isEnabled: true,
          value: inputAccounts,
          label: inputAccounts,
        },
      ]);
    }

    setInputAccounts('');
  };

  const handleSaveAllChanges = async () => {
    if (confirm('Are you sure to confirm your changes')) {
      const userId = store.getState()?.user?.user?.userId;

      try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
          categories: categories,
          accounts: accounts,
        });
        store.dispatch(updateCategories(categories));
        store.dispatch(updateAccounts(accounts));
        alert('SUCCESS! Accounts & Categories Successfully saved');
        setIsEdit(false);
      } catch (error) {
        alert('ERROR!', error.message);
        console.log(error);
      }
    } else {
      setIsEdit(false);
    }
  };

  return (
    <Box>
      <Grid
        container
        sx={{ my: 4, display: 'flex', gap: 2, alignItems: 'center' }}
      >
        <Typography>Save all the changes</Typography>
        <Button
          variant="contained"
          onClick={handleSaveAllChanges}
          type="submit"
          color="secondary"
        >
          Save All
        </Button>
      </Grid>
      <Grid>
        <Title>Accounts Type</Title>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {accounts.map((account) => {
            return (
              <AccountComponent
                key={account.value}
                account={account?.value}
                isSelected={account.isEnabled}
                onClickCheckbox={() => toggleCheckboxAccount(account)}
                handleDeleteAccount={() => {
                  handleDeleteAccount(account);
                }}
              />
            );
          })}
        </List>
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
            label="Add Accounts"
            value={inputAccounts}
            onChange={(e) => setInputAccounts(e.target.value)}
          />
          <Button variant="outlined" onClick={handlePushInputAccounts}>
            <CheckIcon />
          </Button>
        </Box>
      </Grid>

      <Grid container spacing={{ sm: 4 }}>
        <Grid item xs={12} sm={6}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <Title> Categories</Title>

            {categories.map((category) => {
              return (
                <CategoryComponent
                  key={category?.value}
                  category={category?.value}
                  isSelected={category?.isEnabled}
                  onClickCheckbox={() => toggleCheckboxCategory(category)}
                  onClickCategory={() => setSelectedCategory(category)}
                  handleDeleteCategory={() => handleDeleteCategory(category)}
                  selectedCategory={selectedCategory}
                >
                  {category}
                </CategoryComponent>
              );
            })}
          </List>
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
              value={inputCategories}
              onChange={(e) => setInputCategories(e.target.value)}
            />
            <Button variant="outlined" onClick={handlePushInputCategory}>
              <CheckIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <Title> Sub Categories: {selectedCategory.value}</Title>

            {categories?.map((category) =>
              category.value === selectedCategory.value
                ? category?.subCategory?.map((item) => (
                    <SubCategoryComponent
                      key={item.value}
                      subcategory={item.value}
                      isSelected={item.isEnabled}
                      onClickCheckbox={() => toggleCheckboxSubCategory(item)}
                      handleDeleteSubCategory={() =>
                        handleDeleteSubCategory(item)
                      }
                    />
                  ))
                : null
            )}
          </List>
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
              label="Add SubCategory"
              value={inputSubCategories}
              onChange={(e) => setInputSubCategories(e.target.value)}
            />
            <Button variant="outlined" onClick={handlePushInputSubCategory}>
              <CheckIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CategoryListEdit;
