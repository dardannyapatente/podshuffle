'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const nodemailer = require('nodemailer');
const { env } = require('process');
const listenNotesApiKey = process.env.LISTENNOTES_API_KEY;

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
  res.render('home', { title: 'Hello World!' });
});

router.get('/shuffle/:id', (req, res, next) => {
  const id = request.params.id;
  const apiUrl = `https://listen-api.listennotes.com/api/v2/?apikey=${listenNotesApiKey}&i=${id}`;
  axios
    .get(apiUrl)
    .then(result => {
      const data = result.data;
      const episode = data;
      response.render('home-result', { episode });
    })
    .catch(error => {
      response.render('error');
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
