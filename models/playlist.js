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
  },
  image: {
    type: String
  },
  episodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode"
  }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
