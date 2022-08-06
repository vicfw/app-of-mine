import { FC } from 'react';
import Header from '../Header/Header';

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default Layout;
