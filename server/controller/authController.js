const User = require('../models/User');

module.exports.signin_get = (req, res) => {
  // Render react-component
  res.render({ data: 'success!' });
};

module.exports.signin_post = (req, res) => {
  console.log(req.body);
  res.json({ user: req.body });
};

module.exports.signup_get = (req, res) => {
  // Render react-component
};

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password });
    console.log(req.body);
    res.json({ user: req.body });
  } catch (error) {}
};
