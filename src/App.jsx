import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import {
  Landing,
  HomeLayout,
  Login,
  Register,
  Error,
  DashBoard,
  Activation,
  Profile,
} from './pages';

//actions
// import { action as registerAction } from './pages/Register';
// import { action as loginAction } from './pages/Login';
// import { action as transactionAction } from './pages/DashBoard';

import { useSelector } from 'react-redux';

const router = createBrowserRouter([
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
          <ProtectedRouter redirectTo="/activation" authPageRedirection="home">
            <DashBoard />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
        // action: transactionAction,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouter
            redirectTo="/activation"
            authPageRedirection="profile"
          >
            <Profile />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
      },
      {
        path: '/activation',
        element: (
          <ProtectedRouter redirectTo="/home" authPageRedirection="activation">
            <Activation />
          </ProtectedRouter>
        ),
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    // action: loginAction,
  },
  {
    path: '/register',
    element: (
      // <ProtectedRouter redirectTo="/activation" authPageRedirection="register">
      <Register />
      // </ProtectedRouter>
    ),
    errorElement: <Error />,
    // action: registerAction,
  },
]);

function ProtectedRouter({ children, redirectTo, authPageRedirection }) {
  const { isLogin } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);

  // if (authPageRedirection === 'login') {
  //   return isLogin ? <Navigate to={redirectTo} /> : children;
  // }
  // if (authPageRedirection === 'register') {
  //   return isLogin ? <Navigate to={redirectTo} /> : children;
  // }
  // if (authPageRedirection === 'activation') {
  //   if (isLogin) {
  //     return !user.activationCompleted ? (
  //       children
  //     ) : (
  //       <Navigate to={redirectTo} />
  //     );
  //   } else {
  //     return <Navigate to="/login" />;
  //   }
  // }
  // if (authPageRedirection === 'home' || authPageRedirection === 'profile') {
  //   return isLogin && user.activationCompleted ? (
  //     children
  //   ) : (
  //     <Navigate to={redirectTo} />
  //   );
  // }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
