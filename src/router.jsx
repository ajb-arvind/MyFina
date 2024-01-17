import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  Landing,
  HomeLayout,
  Login,
  Register,
  Error,
  DashBoard,
  Transactions,
  Profile,
  Stats,
} from './pages';
import { useSelector } from 'react-redux';

function ProtectedRouter({ children, redirectTo, authPageRedirection }) {
  const { isLogin } = useSelector((state) => state.user);

  if (authPageRedirection === 'login' || authPageRedirection === 'register') {
    return !isLogin ? children : <Navigate to={redirectTo} />;
  }

  return isLogin ? children : <Navigate to={redirectTo} />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: '/home',
        element: (
          <ProtectedRouter redirectTo="/login" authPageRedirection="home">
            <DashBoard />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouter redirectTo="/login" authPageRedirection="profile">
            <Profile />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
      },
      {
        path: '/transactions',
        element: (
          <ProtectedRouter
            redirectTo="/login"
            authPageRedirection="transactions"
          >
            <Transactions />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
      },
      {
        path: '/stats',
        element: (
          <ProtectedRouter redirectTo="/login" authPageRedirection="stats">
            <Stats />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <ProtectedRouter redirectTo="/home" authPageRedirection="register">
        <Login />
      </ProtectedRouter>
    ),
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: (
      <ProtectedRouter redirectTo="/home" authPageRedirection="register">
        <Register />
      </ProtectedRouter>
    ),
    errorElement: <Error />,
  },
]);
