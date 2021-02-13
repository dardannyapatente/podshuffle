'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const nodemailer = require('nodemailer');
const { env } = require('process');
const listenNotesApiKey = process.env.LISTENNOTES_API_KEY;
const axios = require('axios');
//onst genres = require('./../genres.json');

// Send confirmation email to the user

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

transport
  .sendMail({
    from: process.env.GMAIL_ADDRESS,
    to: process.env.GMAIL_ADDRESS,
    subject: 'Verify your email for PodShuffle',
    html: `
    <html> 
        <body>
            <a href="http://example.com">Confirm your email address</a>
        </body>
    </html>
`
  })
  .then((result) => {
    console.log('Email was sent.');
    console.log(result);
  })
  .catch((error) => {
    console.log('There was an error sending email.');
    console.log(error);
  });

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Homepage' });
});

router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About us' });
});

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

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('profile');
});

router.get('/home-auth', routeGuard, (req, res, next) => {
  res.render('home-auth', { title: 'Homepage' });
});

router.get('/result-shuffle-filtered', async (req, res, next) => {
  const keywordQuery = req.query.q;
  //const length = req.query.length_max;
  //const genreId = req.query.genre_ids;
  //const language = req.query.language;
  try {
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
    console.log(keywordQuery);
    res.render('single-episode', {
      keywordQuery: keywordQuery, episode: episodeObject.results[Math.floor(Math.random()*episodeObject.results.length)]
    });
    //
    //length: length,
    //genreId: genreId,
    //language: language,
  } catch (error) {
    next(error);
  }
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

// router.get('/episode/:id', async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const response = await unirest
//       .get(
//         `https://listen-api.listennotes.com/api/v2/episodes/${id}?show_transcript=1`
//       )
//       .header('X-ListenAPI-Key', `${listenNotesApiKey}`);
//     response.toJSON();
//     res.redirect(`/episode/${_id}`);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/episode/:id/delete', async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const response = await unirest
//       .get(
//         `https://listen-api.listennotes.com/api/v2/episodes/${id}?show_transcript=1`
//       )
//       .header('X-ListenAPI-Key', `${listenNotesApiKey}`);
//     response.toJSON();
//     res.redirect(`/episode/${_id}`);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
