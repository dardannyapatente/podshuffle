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



