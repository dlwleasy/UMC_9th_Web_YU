import { Outlet } from 'react-router-dom';
import { Navbars } from '../component/NavBars';

export const Rootlayout = () => {
  return (
    <>
      <Navbars></Navbars>
      <Outlet></Outlet>
    </>
  );
};
