import React, { useState } from 'react';
import SignupForm from '../components/SignForm/SignupForm';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <SignupForm
      showPassword={showPassword}
      onToggle={handleToggleShowPassword}
    />
  );
};

export default Signin;
