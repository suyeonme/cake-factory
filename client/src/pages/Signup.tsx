import React, { useState } from 'react';
import axios from 'axios';
import { UserType } from '../components/SignForm/SignupForm';
import SignupForm from '../components/SignForm/SignupForm';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: UserType): Promise<any> => {
    try {
      const res = await axios.post('/signup', values);
      console.log(res);
    } catch (error) {
      const { data, status } = error.response;
      console.log({ status, data });
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
