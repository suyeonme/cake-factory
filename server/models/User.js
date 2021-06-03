const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 characters'],
    // Special character is required
  },
});

userSchema.pre('save', async function (next) {
  // Hash password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
