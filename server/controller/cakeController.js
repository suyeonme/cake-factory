const jwt = require('jsonwebtoken');
const sharp = require('sharp');

// CRUD

const Cake = require('../models/Cake');
const { secret } = require('../config/config');

module.exports.cake_add_post = async (req, res) => {
  try {
    const cake = new Cake({
      ...req.body,
      owner: req.user._id,
    });
    await cake.save();
    await res.status(201).send(cake);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.cake_get = (req, res, next) => {
  res.json({ cake: true });
};
