var router = require('express').Router();
let passport = require('passport')

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/students');
});

// Google OAuth login route <-- our login button better point to this
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/students',
    failureRedirect : '/students'
  }
));

// OAuth logout route <--- our logout button better point to this
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/students');
});

module.exports = router;