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
              html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Welcome to PodShuffle</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="stylesheet" href="/styles/style.css" />
                <style type="text/css">
                  a[x-apple-data-detectors] {color: inherit !important;}
                </style>
              
              </head>
              <body style="margin: 0; padding: 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 20px 0 30px 0;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="white" style="padding: 40px 0 30px 0;">
                    <img src="https://www.litmus.com/wp-content/uploads/2020/04/6-steps-welcome-email-header2.png" alt="Welcome email." width="300" height="230" style="display: block;" />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 40px 30px 100px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                      <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif;">
                          <h1 style="font-size: 24px; margin: 0; text-align: center;">Welcome to PodShuffle</h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                          <p style="margin: 0; text-align: center;">Enjoy quality content about your favorite topics. All of the fun with none of the decision fatigue. Serendipity has never been this easy.</p>
                        </td>
                      </tr>
                    </table>
                    <div style="text-align: center; margin-right: 34%;">
                        <a href="https://ironhack-podcast-app.herokuapp.com" target="_blank"><button class="shuffle-button" style="display: inline-block; background-color: #d57868; color: white; height: 55px; width: 180px; align-self: center; font-size: large; align-items: center; position: absolute;">Go to PodShuffle</button></a>
                    </div>
              
                <tr>
                  <td bgcolor="#d57868" style="padding: 20px 30px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                      <tr>
                        <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                          <p style="margin: 0;">&reg; PodShuffle, 2021<br/>
                        </td>
                        <td align="right">
                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                            <tr>
                              <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                              <td>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
                    </td>
                  </tr>
                </table>
              </body>
              </html>
              
              `
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
