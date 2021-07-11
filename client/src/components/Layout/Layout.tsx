import React from 'react';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactNode;
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
}

const Layout = ({ children, isAuth, setIsAuth }: LayoutProps) => {
  return (
    <>
      <header>
        <Nav isAuth={isAuth} setIsAuth={setIsAuth} />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
