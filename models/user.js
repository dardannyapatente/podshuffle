'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String
  },
  picture: {
    type: String,
    default:
      'https://archive.org/download/user-image-with-black-background_318-34564/user-image-with-black-background_318-34564.jpg'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
