'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('../middleware/route-guard');
const uploadMiddleware = require('../middleware/file-upload');
const Episode = require('../models/episode');
const listenNotesApiKey = process.env.LISTENNOTES_API_KEY;
const axios = require('axios');

router.get('/result-shuffle', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://listen-api.listennotes.com/api/v2/just_listen',
      {
        headers: {
          'X-ListenAPI-Key': `${listenNotesApiKey}`
        }
      }
    );
    const episode = response.data;
    res.render('single-episode', { episode });
  } catch (error) {
    next(error);
  }
});

router.get('/result-shuffle-filtered', async (req, res, next) => {
  //const length = req.query.length_max;
  //const genreId = req.query.genre_ids;
  //const language = req.query.language;
  try {
    const keywordQuery = await req.query.q;
    const response = await axios.get(
      `https://listen-api.listennotes.com/api/v2/search?q=${keywordQuery}`,
      //`https://listen-api.listennotes.com/api/v2/search?q=${keywordQuery}&type=episode&len_max=${length}&genre_ids=${genreId}&language=${language}`,
      {
        headers: {
          'X-ListenAPI-Key': `${listenNotesApiKey}`
        }
      }
    );
    const episodeObject = response.data;
    res.render('single-episode', {
      keywordQuery: keywordQuery,
      episode:
        episodeObject.results[
          Math.floor(Math.random() * episodeObject.results.length)
        ]
    });
    //
    //length: length,
    //genreId: genreId,
    //language: language,
  } catch (error) {
    next(error);
  }
});

router.get('/podcast', (req, res, next) => {
    res.render('single-podcast');
});

router.get('/podcast/:id', async (req, res, next) => {
    const id = req.params.id;
    const response = axios.get(
        `https://listen-api.listennotes.com/api/v2/podcasts/${id}?&sort=recent_first`,
        {
            headers: {
              'X-ListenAPI-Key': `${listenNotesApiKey}`
            }
          })
       .then((podcast) => {
        res.render('single-podcast', { podcast });       
       })
      .catch((error) => {
        next(error);
      });
  });


// Same as above but an async function:

// router.get('/podcast/:id', async (req, res, next) => {
//   try {
//     const id = await req.params.id;
//     const response = await axios.get(
//         `https://listen-api.listennotes.com/api/v2/podcasts/${id}?&sort=recent_first`,
//         {
//             headers: {
//               'X-ListenAPI-Key': `${listenNotesApiKey}`
//             }
//           }
// );
//      const podcastId = response.data;
//     res.render('single-podcast');
//   } catch (error) {
//     next(error);
//   }
// });



module.exports = router;
