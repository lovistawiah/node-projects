const express = require('express')
const route = require('./router')
const bodyParser = require('body-parser')

const app = express();


//home page
app.get('/', (req, res) => {
    res.end("Home Page")
})
app.get('/', (req, res) => {
    res.end("Home Page")
})

app.use(bodyParser.urlencoded({ extended: false }))
// body parser use to serialize the request of a body 

// NOTE: specified name in the first argument is the route of the browser
app.use('/api', route)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`serving at http://localhost:${PORT}`))