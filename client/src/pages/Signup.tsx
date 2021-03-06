import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { UserType } from '../components/SignForm/SignupForm';
import SignupForm from '../components/SignForm/SignupForm';

interface SigninProps {
  setIsAuth: (auth: boolean) => void;
}

const Signin = ({ setIsAuth }: SigninProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleToggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: UserType): Promise<any> => {
    try {
      const res = await axios.post('/signup', values);
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

  return (
    <SignupForm
      showPassword={showPassword}
      onToggle={handleToggleShowPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default Signin;
