import { Box, List, Button, TextField } from '@mui/material';

import { useState } from 'react';
import Title from './Title';
import CheckIcon from '@mui/icons-material/Check';
import {
  pushToAccounts,
  pushToCategories,
  updateAccounts,
  updateCategories,
  updateCheckbox,
  updateSubCategories,
} from '../redux/features/user/userSlice';
import { useDispatch } from 'react-redux';
import CommonCategory from './CommonCategory';

const CATEGORIES = 'Categories';
const SUB_CATEGORIES = 'Sub Categories';
const ACCOUNTS = 'Accounts';
const INCOME_CATEGORIES = 'Income Categories';
const INCOME_SUB_CATEGORIES = 'Income Sub Categories';

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

  const toggleCheckbox = (id) => {
    switch (title) {
      case ACCOUNTS:
        dispatch(updateCheckbox({ type: 'accounts', id }));
        break;

      case CATEGORIES:
      case SUB_CATEGORIES:
        dispatch(updateCheckbox({ type: 'categories', id }));
        break;

      case INCOME_CATEGORIES:
      case INCOME_SUB_CATEGORIES:
        dispatch(updateCheckbox({ type: 'incomeCategories', id }));
        break;
    }
  };

  const handleDeleteFromData = (id) => {
    if (confirm(`Are sure to delete the ${data[id].value}`)) {
      switch (title) {
        case ACCOUNTS:
          dispatch(updateAccounts(id));
          break;
        case CATEGORIES:
          dispatch(updateCategories({ type: 'categories', id }));
          break;
        case SUB_CATEGORIES:
          dispatch(
            updateSubCategories({
              type: 'categories',
              parentId: selectedCategoryId,
              childId: id,
            })
          );

          break;
        case INCOME_CATEGORIES:
          dispatch(updateCategories({ type: 'incomeCategories', id }));
          break;
        case INCOME_SUB_CATEGORIES:
          dispatch(
            updateSubCategories({
              type: 'incomeCategories',
              parentId: selectedCategoryId,
              childId: id,
            })
          );
          break;
      }

      //TODO: updateIncomeCategories
    }
  };

  const handlePushToData = () => {
    if (inputValue !== '') {
      switch (title) {
        case ACCOUNTS:
          dispatch(pushToAccounts(inputValue));
          break;
        case CATEGORIES:
          dispatch(
            pushToCategories({
              type: 'categories',
              inputValue,
              isCategory: true,
            })
          );
          break;
        case SUB_CATEGORIES:
          dispatch(
            pushToCategories({
              type: 'categories',
              inputValue,
              isCategory: false,
              selectedCategoryId,
            })
          );
          break;
        case INCOME_CATEGORIES:
          dispatch(
            pushToCategories({
              type: 'incomeCategories',
              inputValue,
              isCategory: true,
            })
          );
          break;
        case INCOME_SUB_CATEGORIES:
          dispatch(
            pushToCategories({
              type: 'incomeCategories',
              inputValue,
              isCategory: false,
              selectedCategoryId,
            })
          );
          break;
      }
    }

    //TODO: pushTOIncomeCategories
    setInputValue('');
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
                onClickCategory={() => {
                  title === CATEGORIES && onClickCategory(id);
                  title == INCOME_CATEGORIES && onClickCategory(id);
                }}
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
            label={
              (title === ACCOUNTS && ACCOUNTS) ||
              (title === CATEGORIES && CATEGORIES) ||
              (title === SUB_CATEGORIES && SUB_CATEGORIES)
            }
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
export default CommonCategoryList;
