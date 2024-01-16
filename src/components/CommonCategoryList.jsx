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

    //TODO: pushTOIncomeCategories
    setInputValue('');
  };

  const toggleCheckbox = (id) => {
    title === ACCOUNTS && dispatch(updateCheckbox({ type: 'accounts', id }));
    title != ACCOUNTS && dispatch(updateCheckbox({ type: 'categories', id }));
    //TODO: updateCheckbox type:incomeCategories
  };

  const handleDeleteFromData = (id) => {
    if (confirm(`Are sure to delete the ${data[id].value}`)) {
      title === ACCOUNTS && dispatch(updateAccounts(id));
      title === SUB_CATEGORIES &&
        dispatch(
          updateSubCategories({ parentId: selectedCategoryId, childId: id })
        );

      title === CATEGORIES && dispatch(updateCategories(id));
      //TODO: updateIncomeCategories 
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
