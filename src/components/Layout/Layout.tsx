import { Container, Pagination } from '@mui/material';
import { FC } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
