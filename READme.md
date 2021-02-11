# Podcast APP

## Routing

METHOD PATH PAGE DESCRIPTION
GET /authentication/sign-up Sign-up Displaying the sign up form
POST /authentication/sign-up Sign-up Submiting the sign up form
GET /authentication/sign-in Sign-in Displaying the sign in form
POST /authentication/sign-in Sign-in Submiting the sign in form
GET /index/home Home Displaying the homepage
GET /index/about About Displaying the about page
POST /index/shuffle/:id Home Submiting the shuffle button
GET /episode/:id Episode Displaying the single episode page with audio player
GET /user/:id Profile Displaying the profile
GET /playlist/create Create-form Display the form to create the playlist
POST /playlist/create Create-form Adding the playlist to the database
GET /playlist/:id Single Playlist Displaying the playlist
GET /playlist/:id/update Update Playlist Displaying the updating form
POST /playlist/:id/update Update Playlist Submiting the updating form
GET /playlist/:id/delete Deletion-confirmation Displaying deletion confirmation
POST /playlist/:id/delete Delete Playlist Deleting playlist
POST /sign-out Redirect to homepage Signing out
GET /error Error Display error message

## Views

home page (with shuffle button)
about page (simple text content)
sign-in (with sign-in form)  
sign-up (with sign-up form with a file upload)
profile (user information, logout link, history and playlists)  
single-episode (showing the episode info with audio player, podcast description and link to add/create a playlist)
create (form for the playlist - name and description )  
single-playlist (with update and delete button)
deletion-confirmation (display deletion confirmation page)
error (error)

## Wishlist

New episode notification
Users can follow each other's playlist
Voting feature

# Changes made by Dardannya on Monday, 08/02:

- Added the Listen Notes API key to index.js, .env and Heroku;
- Created an email to set up the email confirmation -> hello.podcastapp@gmail.com
  Also added the email in the .env file and Heroku (not sure if we have to add all those keys in Heroku, doing so just to make sure). Installed the nodemailer package. We still have to create the email message or view.
- Added a js file to the fold "Middleware" to be able to upload the picture. Installed multer/cloudinary/multer-storage-cloudinary packages. Set up for the profile picture is completed.

# Changes made by Axelle on Monday, 08/02:

(I did not have time to do much today since i finished work way later than anticipated)

- reviewed your code and basically took my time to understand everything
- corrected a few errors in authentication:js and index.js (required axios for example). There are some synthax errors left.
- added the about page (so we don't forget it later)
- removed the home-result page: to me, it makes more sense if we go directly to the random episode (single-episode page) after hitting shuffle (like in the ironbeers lab)
- added the "random" factor to the API request (not so sure about that part so let me know)
- currently working on the wireframes, should be ready for tomorrow before class, then we'll create the views based on them.
- can you paste somewhere the link the Heroku deploy please ? Thanks :)

# Here is the link to the Heroku deploy:

https://dashboard.heroku.com/apps/ironhack-podcast-app/deploy/github

# Changes made by Dardannya on Wednesday, 10/02:

- installed hbs to set partials (navbar)
- added an async function to get random podcast (following the suggestion in the documentation)
- added some info in the views based on the wireframes (couldn't check if it's working)

# For next class:

- How to get each info related to playlists, episodes, etc? (Profile view).
- Check how to update the playlist without leaving the page.
- How to make a pop up delete confirmation
- Forgot your password link
- Check how we can set a default image for the user
- Make the user authenticate to use the shuffle button (req.user and if statement, I guess)
- There are really no methods in this API?
- How do we get the genres id and parents id in an order? So that we can implement the filter option