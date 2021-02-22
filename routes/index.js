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

// router.get('/profile', routeGuard, (req, res, next) => {
//   res.render('profile');
// });

router.get('/home-auth', routeGuard, (req, res, next) => {
  res.render('home-auth', {
    title: 'Homepage',
    genres: genres,
    languages: languages
  });
});


module.exports = router;
