'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');
const Playlist = require('./../models/playlist');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('playlist/create-form');
});

router.post('/create', 
uploadMiddleware.single('image'), 
routeGuard, (req, res, next) => {
  const data = req.body;
  Playlist.create({
    name: data.name,
    description: data.description,
    // creator: req.user._id
    // creator: req.session.userId
    image: image
  })
    .then((playlist) => {
      res.render('playlist/single-playlist', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Playlist.findById(id)
    .then((playlist) => {
      res.render('playlist/single-playlist', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Playlist.findById(id)
    .then((playlist) => {
      res.render('playlist/update', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Playlist.findByIdAndUpdate(id, {
    name: data.name,
    description: data.description
  })
    .then((playlist) => {
      res.render('playlist/single-playlist', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Playlist.findById(id)
    .then((playlist) => {
      res.render('playlist/deletion-confirmation', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Playlist.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/home');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
