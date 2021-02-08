'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const router = new Router();
const uploadMiddleware = require('./../middleware/file-upload');

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', 
uploadMiddleware.single('picture'), 
(req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    User.findOne({
      email: email
    })
      .then(user => {
        if (user) {
          throw new Error('There is already a user with that email.');
        } else {
          return bcryptjs.hash(password, 10);
        }
      })
    .then((hash) => {
      let picture;
      if (req.file) {
        picture = req.file.path;
      }
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        picture
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.render('profile');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.render('profile');
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
