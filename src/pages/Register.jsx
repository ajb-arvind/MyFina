import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { loginUser } from '../redux/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  InitialUserAccounts,
  InitialUserCategories,
  InitialUserIncomeCategories,
} from '../misc/Utils';
import { Copyright } from '../components';

const defaultTheme = createTheme();

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailId = data.get('email');
    const password = data.get('password');
    const name = `${data.get('firstName')} ${data.get('lastName')}`;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailId,
        password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email: emailId,
        userId: userCredential.user.uid,
        incomeCategories: InitialUserIncomeCategories,
        categories: InitialUserCategories,
        accounts: InitialUserAccounts,
        profileUrl: '',
        createdAt: Date.now(),
      });

      await sendEmailVerification(auth.currentUser);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      //if sign in successful save following details in store-userSlice
      const { email, displayName, emailVerified, uid } = userCredential.user;
      dispatch(
        loginUser({
          user: {
            email,
            displayName,
            emailVerified,
            uid,
            InitialUserIncomeCategories,
            InitialUserCategories,
            InitialUserAccounts,
          },
          isLogin: true,
        })
      );
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="login"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 12 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Register;
