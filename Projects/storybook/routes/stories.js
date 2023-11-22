const router = require('express').Router()
const { ensureAuth } = require('../middleware/auth')
const { Story } = require('../models/Story')


router.get('/',(req,res)=>{
    res.render('stories/public_stories')
})


// @ show add page
// @route GET/
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})


// @ dashboard page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.user }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})



// @ add stories page
// @ POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.body.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router