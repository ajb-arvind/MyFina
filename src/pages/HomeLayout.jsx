import { Outlet } from 'react-router-dom';
import { NavbarFinance } from '../components';

const HomeLayout = () => {
  return (
    <>
      <NavbarFinance />
      <Outlet />
    </>
  );
};
export default HomeLayout;
