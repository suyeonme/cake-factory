const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/config');

// Utils
const MAX_AGE = 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, secret, {
    expiresIn: MAX_AGE,
  });
};

const handleErrors = err => {
  let errors = { email: '', password: '' };
  console.log(err.message, err.code);

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_get = (req, res) => {
  // Render react-component
};

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res
      .status(201)
      .json({ user: { id: user._id, firstName, lastName, email, token } });
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.signin_get = (req, res) => {
  // Render react-component
  res.render({ data: 'success!' });
};

module.exports.signin_post = (req, res) => {
  console.log(req.body);
  res.json({ user: req.body });
};

module.exports.jwt_get = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log({ token });

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/signin');
      } else {
        console.log({ decodedToken });
        res.json({ decodedToken });
        // next();
      }
    });
  } else {
    res.redirect('/signin');
  }
};
