'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('../middleware/route-guard');
const uploadMiddleware = require('../middleware/file-upload');
const Favorite = require('../models/favorite');


router.post(
  '/:id/add-to-favorite',
  routeGuard,
  (req, res, next) => {
    const paramsId = req.params.id;
    Favorite.create({
      user: req.user._id,
      favoritePodcastId: paramsId
    })
    .then(()=>{
      res.redirect(`/episode/podcast/${{id}}`)
    })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Favorite.findById(id)
    .then((playlist) => {
      res.render('playlist/single-playlist', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Favorite.findById(id)
    .then((favorite) => {
      res.render('favorite/favorite-list-update', { playlist });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Favorite.findByIdAndUpdate(id, {
    name: data.name
  })
    .then((favorite) => {
      res.render('favorite/favorite-list', { favorite });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Favorite.findById(id)
    .then((favorite) => {
      res.render('favorite/deletion-confirmation', { favorite });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Favorite.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/favorite-list');
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/add-to-playlist', (req, res) => {
//   const id = req.params.id;
//   Favorite.findById(id)
//     .populate('podcast')
//     .then((podcast) => {
//       console.log(podcast);
//       res.render('single-podcast', { podcast });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = router;
