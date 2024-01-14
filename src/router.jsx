import { Navigate, createBrowserRouter } from 'react-router-dom';
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
import { useSelector } from 'react-redux';

//action
import { action as transactionAction } from './pages/DashBoard';

function ProtectedRouter({ children, redirectTo, authPageRedirection }) {
  // const { isLogin } = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user.user);
  // if (authPageRedirection === "login") {
  //   return isLogin ? <Navigate to={redirectTo} /> : children;
  // }
  // if (authPageRedirection === "register") {
  //   return isLogin ? <Navigate to={redirectTo} /> : children;
  // }
  // if (authPageRedirection === "activation") {
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
  // if (authPageRedirection === "home" || authPageRedirection === "profile") {
  //   return isLogin && user.activationCompleted ? (
  //     children
  //   ) : (
  //     <Navigate to={redirectTo} />
  //   );
  // }
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
          // <ProtectedRouter redirectTo="/activation" authPageRedirection="home">
          <DashBoard />
          // </ProtectedRouter>
        ),
        errorElement: <Error />,
        action: transactionAction,
      },
      {
        path: '/profile',
        element: (
          // <ProtectedRouter
          //   redirectTo="/activation"
          //   authPageRedirection="profile"
          // >
          <Profile />
          // </ProtectedRouter>
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
  },
  {
    path: '/register',
    element: (
      // <ProtectedRouter redirectTo="/activation" authPageRedirection="register">
      <Register />
      //{" "}
      // </ProtectedRouter>
    ),
    errorElement: <Error />,
  },
]);
