
const router = require('express').Router();
const validUrl = require('valid-url')
const shortId = require('shortid')

// ! use dotenv instead of config

const Url = require('../models/Url')

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    if (!validUrl.isUri(longUrl)) {
        res.status(401).json({ "message": "Invalid long url" })
    } else {
        try {
            let baseUrl = process.env.baseUrl;
            if (validUrl.isUri(baseUrl)) {
                //check database for specific url
                let url = await Url.findOne({ longUrl });
                if (url) {
                    res.json(url)
                } else {
                    const urlCode = shortId.generate();
                    let shortUrl = baseUrl + '/' + urlCode
                    url = new Url({
                        shortUrl,
                        longUrl,
                        date: new Date()
                    });
                    url.save();
                    res.status(200).json(url)
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
})


module.exports = router;