const router = require('express').Router();

const Url = require('../models/Url')

// @route   GET /:code
// @desc    Redirect to long url

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code })
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json({ "message": "No url found" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "Internal Server error" })
    }
})


module.exports = router