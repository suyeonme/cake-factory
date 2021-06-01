import React, { useState } from 'react';
import axios from 'axios';
import SigninForm from '../components/SignForm/SigninForm';

export interface UserType {
  email: string;
  password: string;
}

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: UserType): Promise<any> => {
    const res = await axios.post('/signin', values);
    console.log(res);
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
