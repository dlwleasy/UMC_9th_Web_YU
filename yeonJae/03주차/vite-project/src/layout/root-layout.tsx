// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import NextPageButton from '../components/nextPage';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <NextPageButton />
      <Outlet />
      <NextPageButton />
    </>
  );
};

export default RootLayout;