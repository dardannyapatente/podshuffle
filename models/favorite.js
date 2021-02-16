'use strict';

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    ref: 'User',
    type: mongoose.Types.ObjectId
  },
  favoritePodcastId: {
    type: String
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
