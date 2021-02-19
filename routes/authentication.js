'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const router = new Router();
const nodemailer = require('nodemailer');
const uploadMiddleware = require('./../middleware/file-upload');

router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

router.post(
  '/sign-up',
  uploadMiddleware.single('picture'),
  (req, res, next) => {
    const data = req.body;
    User.findOne({
      email: data.email
    })
      .then((user) => {
        if (user) {
          throw new Error('There is already a user with that email.');
        } else {
          return bcryptjs.hash(data.password, 10);
        }
      })
      .then((passwordHashAndSalt) => {
        let picture;
        if (req.file) {
          picture = req.file.path;
        }
        return User.create({
          name: data.name,
          email: data.email,
          passwordHashAndSalt: passwordHashAndSalt,
          picture
        });
      })
      .then((user) => {
        req.session.userId = user._id;
        res.redirect('/home-auth');
      })
      .then(() => {
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
            to: data.email,
            subject: 'Welcome to PodSuffle',
              html: {
                  path: __dirname + 'email-message.html'
              }
          })
          .then((result) => {
            console.log('Email was sent.');
          })
          .catch((error) => {
            console.log('There was an error sending email.');
          });
      })
   });

router.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const data = req.body;
  User.findOne({ email: data.email})
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(data.password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.redirect('/home-auth');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
