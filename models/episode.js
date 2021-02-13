'use strict';

const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
