const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { secret } = require('../config/config');
const { MAX_AGE, handleErrors } = require('../utils/utils');

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = await user.createToken();
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
  // Check user is signed in (jwt exists)
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // res.redirect('/signin');
        res.end();
      } else {
        res.json({ token: decodedToken });
      }
    });
  } else {
    res.json('Please authenticate.');
  }
};

module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signin(email, password);
    const token = await user.createToken();
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.signout_get = async (req, res) => {
  try {
    // Remove token from tokens array
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();

    // Remove jwt from user's browser
    res.cookie('jwt', '', { maxAge: 1 });
    res.send();
  } catch (e) {
    res.status(500).json(e);
  }
};
