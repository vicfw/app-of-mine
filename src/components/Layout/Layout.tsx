import { Container, Pagination } from '@mui/material';
import { FC } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout: FC<{ title?: string; children: any }> = ({ title, children }) => {
  return (
    <>
      <Header title={title} />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
