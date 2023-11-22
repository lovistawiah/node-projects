const express = require('express');
const fs = require("fs");
const path = require('path');


const app = express()

app.use(function (req, res, next) {
    console.log("Request Date: " + new Date())
    // res.send("MiddleWare app")
    next();
})
app.use(function (req, res, next) {
    //getting file path 
    var filePath = path.join(__dirname, "static", req.url)
    // checking status of a file
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next()
            return
        }
        // conditional checking for file
        if (fileInfo.isFile()) {
            res.sendFile(filePath)
        } else {
            next()
        }
    })
})
app.use(function (req, res) {
    res.status(404)
    res.send("File not Found")
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`serving at http://localhost:${port}`))
