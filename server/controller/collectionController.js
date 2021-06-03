const jwt = require('jsonwebtoken');
const Collection = require('../models/Collection');
const { secret } = require('../config/config');

module.exports.collection_get = (req, res, next) => {
  res.json({ collection: true });
};
