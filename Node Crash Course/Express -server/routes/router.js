const path = require('path')
const express = require('express')
const router = express.Router();

// ?                    REGULAR EXPRESSION IN EXPRESS
// ? ^ - start with 
// ? $ end with 
// ? (.html)? - make .html optional
router.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'))
})
module.exports = router;