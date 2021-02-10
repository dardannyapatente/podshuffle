'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const nodemailer = require('nodemailer');
const { env } = require('process');
const axios = require('axios');
const listenNotesApiKey = process.env.LISTENNOTES_API_KEY;
const unirest = require('unirest');

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

router.get('/shuffle', async (req, res, next) => {
try {
  const response = await unirest.get('https://listen-api.listennotes.com/api/v2/just_listen')
 .header('X-ListenAPI-Key', `${listenNotesApiKey}`)
 response.toJSON();
 res.render('single-episode');
}
  catch(error) {
   next(error);
  };
});

// router.get('/shuffle', (req, res, next) => {
//   const apiUrl = `https://listen-api.listennotes.com/api/v2/just_listen/?apikey=${listenNotesApiKey}`;
//   axios.request(apiUrl)
//     .then((episode) => {
//       res.render('single-episode', episode[0]);
//     })
//     .catch((error) => {
//       res.render('error');
//     });
// });

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('profile');
});


router.get('/episode/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await unirest.get(`https://listen-api.listennotes.com/api/v2/episodes/${id}?show_transcript=1`)
   .header('X-ListenAPI-Key', `${listenNotesApiKey}`)
   response.toJSON();
   res.redirect(`/episode/${_id}`);
  }
  catch(error) {
   next(error);
  };
});


module.exports = router;
