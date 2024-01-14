import * as React from 'react';
import {
  Button,
  TextField,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { categories, formatDateDDYMMYYY } from '../misc/Utils';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../redux/store';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { encrypt } from '../misc/encrypt';
import { useNavigate } from 'react-router-dom';

export default function NewTransaction() {
  const [type, setType] = useState('income');

  const userData = useSelector((state) => state.user.user);

  const accountOptions = Object.values(userData.accounts);

  function getAllCategories(data) {
    let list = [];
    for (const [key, value] of Object.entries(data)) {
      if (value.isCategory) {
        list.push(value);
      }
    }
    return list;
  }

  const CategoriesOption = getAllCategories(userData.categories);

  const [date, setDate] = useState(formatDateDDYMMYYY(new Date()));
  const [selectedCategory, setSelectedCategory] = useState({
    label: '',
    subCategory: [],
    value: '',
    isEnable: false,
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const SubCategoryIds = selectedCategory?.subCategory;

  function getAllSubCategories(SubCategoryIds) {
    return SubCategoryIds?.map((item) => userData.categories[item]) || [];
  }

  const subCategoryOption = getAllSubCategories(SubCategoryIds);

  const handleType = (event, newType) => {
    setType(newType);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const transactionId = uuidv4();
      await setDoc(doc(db, 'transactions', transactionId), {
        account: data.get('account'),
        amount: Number(data.get('amount')),
        category: data.get('category'),
        date: data.get('date'),
        note: encrypt(data.get('note')),
        subCategory: data.get('subCategory'),
        type: type,
        userId: store.getState()?.user?.user?.userId,
        createdAt: Date.now(),
        transactionId,
      });

      alert('Success!');
    } catch (error) {
      alert('Error!', error.message);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <ToggleButtonGroup
            fullWidth
            value={type}
            color="primary"
            exclusive
            onChange={handleType}
            aria-label="Platform"
            name="type"
            id="type"
          >
            <ToggleButton aria-label="left aligned" value="income" name="type">
              Income
            </ToggleButton>
            <ToggleButton aria-label="left aligned" value="expense" name="type">
              Expense
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Autocomplete
            fullWidth
            disablePortal
            sx={{ py: 1 }}
            id="account"
            options={accountOptions}
            value={selectedAccount}
            onChange={(event, newValue) => {
              setSelectedAccount(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Account" name="account" />
            )}
          />
          <Autocomplete
            fullWidth
            disablePortal
            sx={{ py: 1 }}
            id="category"
            options={CategoriesOption}
            value={selectedCategory}
            onChange={(event, newValue) => {
              setSelectedCategory(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Category" name="category" />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <Autocomplete
            fullWidth
            disablePortal
            sx={{ py: 1 }}
            id="subCategory"
            options={subCategoryOption}
            value={selectedSubCategory}
            onChange={(event, newValue) => {
              setSelectedSubCategory(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Sub Category" name="subCategory" />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Amount"
            id="amount"
            name="amount"
            type="number"
            sx={{ my: 1 }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Note"
            id="note"
            name="note"
            type="text"
            sx={{ my: 1 }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Add Transaction
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
