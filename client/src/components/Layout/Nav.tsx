import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface NavProps {
  setIsAuth: (auth: boolean) => void;
}

const Nav = ({ setIsAuth }: NavProps) => {
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
      <button onClick={onSignout}>Signout</button>
    </div>
  );
};

export default Nav;
