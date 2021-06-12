import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import SigninForm from '../components/SignForm/SigninForm';

export interface UserType {
  email: string;
  password: string;
}

interface SigninProps {
  setIsAuth: (auth: boolean) => void;
}

const Signin = ({ setIsAuth }: SigninProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values: UserType): Promise<any> => {
    try {
      const res = await axios.post('/signin', values);
      const user = res.data.user;
      if (user) {
        setIsAuth(true);
        history.push('/collection');
      }
    } catch (error) {
      const { data, status } = error.response;
      console.log(status, data.errors);
    }
  };

  const handleToggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <SigninForm
      showPassword={showPassword}
      onToggle={handleToggleShowPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default Signin;
