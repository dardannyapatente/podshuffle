'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const { env } = require('process');
const genres = require('./../genres.json');
const languages = require('./../languages.json');

// Send confirmation email to the user

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Homepage' });
});

router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About us' });
});

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('profile');
});

router.get('/home-auth', routeGuard, (req, res, next) => {
  res.render('home-auth', {
    title: 'Homepage',
    genres: genres,
    languages: languages
  });
});

// router.get('/home', routeGuard, (req, res, next) => {
//   const topLevelGenres = genres.filter((genre) => {
//     return genre.parent_id === 67;
//   });
//   // Renders list of anchor tags taking user to /genres/id of the genre
//   res.render('home-auth-genres', { genres: topLevelGenres });
// });

// router.get('/genres/:genreId', routeGuard, (req, res, next) => {
//   const genreId = req.params.genreId;
//   const subgenres = genres.filter((genre) => {
//     return genre.parent_id === id;
//   });
//   res.render('home-auth-subgenres', { subgenres: subgenres });
// });

// router.get('/generate-random/:subgenreId', routeGuard, (req, res, next) => {
//   const subgenreId = req.params.subgenreId;
//   // Call to the api getting single podcast with genre: subgenreId
//   res.render('play-podcast', { podcast });
// });

module.exports = router;
