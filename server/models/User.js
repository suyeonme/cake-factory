const mongoose = require('mongoose');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { secret } = require('../config/config');
const { MAX_AGE } = require('../utils/utils');

const UserSchema = new mongoose.Schema(
  {
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
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual('cake', {
  ref: 'Cake',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.methods.createToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, secret, {
    expiresIn: MAX_AGE,
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('There is no user');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is not matched');
  }

  return user;
};

/* Middleware */
UserSchema.pre('save', async function (next) {
  const user = this;
  const saltRounds = 10;

  // Only hash the password if it has been modified OR is new
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

// Remove tasks when user is removed
// UserSchema.pre('remove', async function (next) {
//   const user = this;
//   await Collection.deleteMany({ owner: user._id });
//   next();
// });

const User = mongoose.model('user', UserSchema);
module.exports = User;
