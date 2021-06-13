import React from 'react';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
  setIsAuth: (auth: boolean) => void;
}

const Layout = ({ children, setIsAuth }: LayoutProps) => {
  return (
    <>
      <header>
        <Nav setIsAuth={setIsAuth} />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
