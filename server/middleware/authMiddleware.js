const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/config');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // res.redirect('/signin');
      } else {
        console.log(decodedToken);
        res.json({ token: decodedToken });
        next();
      }
    });
  } else {
    // res.redirect('/signin');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = { requireAuth, checkUser };
