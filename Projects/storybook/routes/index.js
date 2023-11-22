const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')
// @ landing page
// @route GET/
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})


// @ dashboard page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    console.log(req.user.id)
    try {
        const stories = await Story.find({ user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router