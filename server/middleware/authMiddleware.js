const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/config');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists or verified
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/signin');
      } else {
        console.log(decodedToken);
        res.json({ token: decodedToken });
        next();
      }
    });
  } else {
    res.redirect('/signin');
  }
};

// Refactoring
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        // next();
      } else {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          throw new Error();
        }

        // req를 통해서 user, token에 접근가능
        req.user = user;
        req.token = token;
        next();
      }
    });
  } else {
    next();
  }
};

// const checkUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     const decoded = jwt.verify(token, secret);
//     const user = await User.findOne({
//       _id: decoded._id,
//       'tokens.token': token,
//     });

//     if (!user) throw new Error();

//     console.log({ user });
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// const auth = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     const decoded = jwt.verify(token, secret);

//     const user = await User.findOne({
//       _id: decoded._id,
//       'tokens.token': token,
//     });
//     console.log({ user });

//     if (!user) throw new Error();

//     req.token = token;
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

module.exports = { requireAuth, checkUser };
