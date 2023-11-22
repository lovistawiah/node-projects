const express = require("express")
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require("path")


const app = express()
const PORT = process.env.PORT || 3000

morgan.token('id', function getId(req) {
    return req.id;
})

let streamLog = fs.createWriteStream(path.join(__dirname, 'accessLog.log'), { flags: 'a' })
app.use(morgan(':id :method :status :url "HTTP/:http-version"'))
app.use(morgan(':id :method :status :url "HTTP/:http-version"', { stream: streamLog }))
app.use(assignId)

app.get('/', (req, res) => {
    res.send("Morgan application")
})


function assignId(req, res, next) {
    req.id = uuidv4()
    next()
}
app.listen(PORT, () => console.log(`serving at http://localhost:${PORT}`))