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

module.exports.signup_post = (req, res) => {
  res.render({ post: true });
};
