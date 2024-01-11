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
    // updateCategories: (state, action) => {
    //   state.user.categories = action.payload;
    // },
    updateAccounts: (state, action) => {
      state.user.accounts = action.payload;
    },
    updateEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    updateActivationCompleted: (state, action) => {
      state.user.activationCompleted = action.payload;
    },
    updateAccounts: (state, action) => {
      delete state.user.accounts[action.payload];
    },
    updateSubCategories: (state, action) => {
      const { parentId, childId } = action.payload;
      state.user.categories[parentId].subCategory = state.user.categories[
        parentId
      ].subCategory.filter((item) => item != childId);

      delete state.user.categories[childId];
    },
    updateCategories: (state, action) => {
      state.user.categories[action.payload].subCategory.forEach((element) => {
        delete state.user.categories[element];
      });
      delete state.user.categories[action.payload];
    },
    updateCheckbox: (state, action) => {
      const { type, id } = action.payload;
      state.user[type][id].isEnabled = !state.user[type][id].isEnabled;
    },
    pushToCategories: (state, action) => {
      const { inputValue, isCategory, selectedCategoryId } = action.payload;
      const newId = uuidv4();
      state.user.categories[newId] = {
        isEnabled: true,
        label: inputValue,
        value: inputValue,
        subCategory: [],
        isCategory: isCategory,
      };
      if (!isCategory) {
        state.user.categories[selectedCategoryId].subCategory.push(newId);
      }
    },
    pushToAccounts: (state, action) => {
      const newId = uuidv4();
      state.user.accounts[newId] = {
        isEnabled: true,
        label: action.payload,
        value: action.payload,
      };
    },
  },
});

export const {
  loginUser,
  logoutUser,
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
