import { createSlice } from '@reduxjs/toolkit';

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
    updateCategories: (state, action) => {
      state.user.categories = action.payload;
    },
    updateAccounts: (state, action) => {
      state.user.accounts = action.payload;
    },
    updateEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    updateActivationCompleted: (state, action) => {
      state.user.activationCompleted = action.payload;
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
} = userSlice.actions;

export default userSlice.reducer;
