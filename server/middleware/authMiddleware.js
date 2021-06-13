const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/config');

const checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decodedToken = jwt.verify(token, secret);

      if (decodedToken) {
        let user = await User.findById(decodedToken.id);

        if (!user) {
          throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
      }
    }
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = { checkUser };
