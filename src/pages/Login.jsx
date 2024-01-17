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
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doc, getDoc } from 'firebase/firestore';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../redux/features/user/userSlice';
import { redirect, useNavigate } from 'react-router-dom';
import { Copyright, PasswordResetDialog } from '../components';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //if sign in successful save following details in store-userSlice
      const { emailVerified, uid } = userCredential.user;
      if (!emailVerified) {
        setResetMessage({
          message: 'Verify Email before login',
          isSuccess: false,
        });

        setTimeout(() => {
          setResetMessage({
            message: '',
            isSuccess: false,
          });
        }, 10000);
        dispatch(logoutUser());
        await signOut(auth);
      } else {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let user = docSnap.data();
          dispatch(
            loginUser({
              user,
              isLogin: true,
              emailVerified: true,
            })
          );
        }
        navigate('/home');
      }

      // redirect to home page
    } catch (error) {
      setResetMessage({
        message: 'Login Error ' + error.message,
        isSuccess: false,
      });
      setTimeout(() => {
        setResetMessage({
          message: '',
          isSuccess: false,
        });
      }, 5000);
    }
  };

  const defaultTheme = createTheme();

  const [open, setOpen] = useState(false);
  const [resetMessage, setResetMessage] = useState({
    message: '',
    isSuccess: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {resetMessage.message ? (
              <Alert
                severity={resetMessage.isSuccess ? 'success' : 'error'}
                sx={{ mt: 2 }}
              >
                {resetMessage.message}
              </Alert>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  variant="button"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                  onClick={handleClickOpen}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <PasswordResetDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          setResetMessage={setResetMessage}
        />
        <Copyright sx={{ mt: 20 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Login;
