import React, { useState } from 'react';
import SigninForm from '../components/SignForm/SigninForm';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SigninForm
      showPassword={showPassword}
      onToggle={handleToggleShowPassword}
    />
  );
};

export default Signin;
