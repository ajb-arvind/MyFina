import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  user: {},
  isLogin: false,
  emailVerified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.isLogin = action.payload.isLogin;
      state.emailVerified = action.payload.emailVerified;
    },

    logoutUser: (state) => {
      state.user = null;
      state.isLogin = false;
      state.emailVerified = false;
    },

    updateEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    updateActivationCompleted: (state, action) => {
      state.user.activationCompleted = action.payload;
    },

    storeUpdatedUsersList: (state, action) => {
      state.user = action.payload;
    },

    //Accounts-categories-income_categories
    updateAccounts: (state, action) => {
      delete state.user.accounts[action.payload];
    },
    pushToAccounts: (state, action) => {
      const newId = uuidv4();
      state.user.accounts[newId] = {
        isEnabled: true,
        label: action.payload,
        value: action.payload,
      };
    },
    updateCheckbox: (state, action) => {
      const { type, id } = action.payload;

      state.user[type][id].isEnabled = !state.user[type][id].isEnabled;
    },
    updateCategories: (state, action) => {
      const { type, id } = action.payload;

      state.user[type][action.payload]?.subCategory?.forEach((element) => {
        delete state.user[type][element];
      });
      delete state.user[type][id];
    },
    updateSubCategories: (state, action) => {
      const { type, parentId, childId } = action.payload;

      state.user[type][parentId].subCategory = state.user[type][
        parentId
      ].subCategory.filter((item) => item != childId);
      delete state.user[type][childId];
    },

    pushToCategories: (state, action) => {
      const { type, inputValue, isCategory, selectedCategoryId } =
        action.payload;
      const newId = uuidv4();
      state.user[type][newId] = {
        isEnabled: true,
        label: inputValue,
        value: inputValue,
        subCategory: [],
        isCategory: isCategory,
      };
      if (!isCategory) {
        state.user[type][selectedCategoryId].subCategory.push(newId);
      }
    },

    //TODO: pushToIncomeCategories
    //TODO: updateIncomeCategories
  },
});

export const {
  loginUser,
  logoutUser,
  storeUpdatedUsersList,
  updateCategories,
  updateAccounts,
  updateEmailVerified,
  updateActivationCompleted,
  updateSubCategories,
  updateCheckbox,
  pushToCategories,
  pushToAccounts,
} = userSlice.actions;

export default userSlice.reducer;
