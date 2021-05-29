import React from 'react';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Wrapper, Title, StyledLink } from './SignFormStyle';
import { validationSchema } from '../../utils/authSchema';

interface SigninFormProps {
  showPassword: boolean;
  onToggle: () => void;
}

const SigninForm = ({ showPassword, onToggle }: SigninFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Wrapper>
      <Title>Signip</Title>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            required
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onToggle}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Signin
          </Button>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledLink to="/">Forgot password?</StyledLink>
            <StyledLink to="/signup">Don't have an account? Sign Up</StyledLink>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default SigninForm;
