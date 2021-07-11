import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

interface NavProps {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
}

const Nav = ({ isAuth, setIsAuth }: NavProps) => {
  const history = useHistory();

  const onSignout = async () => {
    await axios('/signout');
    history.push('/');
    setIsAuth(false);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/collection">Collection</Link>
      {isAuth && <button onClick={onSignout}>Signout</button>}
    </div>
  );
};

export default Nav;
