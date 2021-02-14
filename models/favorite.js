'use strict';

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
