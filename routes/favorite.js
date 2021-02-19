'use strict';

const express = require('express');
const router = new express.Router();
const Favorite = require('../models/favorite');
const routeGuard = require('../middleware/route-guard');
const axios = require('axios');
const listenNotesApiKey = process.env.LISTENNOTES_API_KEY;

router.post('/:id/add-to-favorites', routeGuard, async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://listen-api.listennotes.com/api/v2/podcasts/${id}`,
      {
        headers: {
          'X-ListenAPI-Key': `${listenNotesApiKey}`
        }
      }
    );
    const singlePodcast = response.data;
    const favoritePodcastTitle = singlePodcast.title;
    const favoritePodcastImage = singlePodcast.image;

    const newFavorite = await Favorite.create({
      user: req.user._id,
      favoritePodcastId: id,
      favoritePodcastTitle: favoritePodcastTitle,
      favoritePodcastImage: favoritePodcastImage
    });

    res.redirect(`/episode/podcast/${id}`);
  } catch (error) {
    next(error);
  }
});
router.get('/favorites-list', routeGuard, (req, res, next) => {
  const currentUser = req.user;
  Favorite.find( { user: currentUser } )
  .then((favorites) => {
    if (favorites) {
      console.log(favorites);
      res.render('favorites-list', { favorites });
    } else {
      res.render('error')
    }
  })
  .catch((error) => {
    next(error);
  });
});
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Favorite.findById(id)
    .then((favorite) => {
    res.redirect(`/episode/podcast/${id}`);
    })
    .catch((error) => {
      next(new Error("I didn't find any episode with that ID!"));
    });
});



router.post('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Favorite.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/favorite/favorites-list');
    })
    .catch((error) => {
      next(error);
    });
});



module.exports = router;
