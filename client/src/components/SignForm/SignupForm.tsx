import React from 'react';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Wrapper, Title, StyledLink } from './SignFormStyle';
import { validationSchema } from '../../utils/authSchema';

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SigninFormProps {
  showPassword: boolean;
  onToggle: () => void;
  onSubmit: (values: UserType) => void;
}

const SignupForm = ({ showPassword, onToggle, onSubmit }: SigninFormProps) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: UserType) => onSubmit(values),
  });

  return (
    <Wrapper>
      <Title>Signup</Title>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              style={{ marginRight: '10px' }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              variant="outlined"
              required
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I swear, I am a big fan of all cakes 🍰"
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Signup
          </Button>
          <StyledLink to="/signin">Already have an account? Sign in</StyledLink>
        </div>
      </form>
    </Wrapper>
  );
};

export default SignupForm;
