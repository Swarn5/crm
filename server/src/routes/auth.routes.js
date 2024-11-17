const express = require('express');
const router = express.Router();
const passport = require('../services/auth.service');
require('dotenv').config();
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Log the CLIENT_URL to check if it's being read correctly
    console.log('CLIENT_URL:', process.env.CLIENT_URL);

    // Successful authentication, redirect to the client application
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }
);

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session' });
      }
      
      res.clearCookie('connect.sid', { path: '/login' });
      res.status(200).json({ message: 'Logout successful' });
    });
  });
});

