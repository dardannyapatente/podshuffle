'use strict';

const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String
  }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
