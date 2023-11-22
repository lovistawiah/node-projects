
const router = require('express').Router();
const passport = require('passport');


// @ Auth with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


// @ google auth callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

// @route log out user
router.get('/logout', (req, res) => {
    // console.log(req.user)
    req.logOut((err) => console.log(err));
    res.redirect('/');
})


module.exports = router;