'use strict';

const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String
  }
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;