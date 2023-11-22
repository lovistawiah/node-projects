const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const connectDB = require('./server/database/connection')


//load config file
dotenv.config({ path: './config.env' })

const app = express()
const PORT = process.env.PORT || 8080

//load requests
app.use(morgan('dev'));
//  mongodb connection
connectDB();


// parse request to body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

// use when nested folder in the views folder is used for the rendering
// app.set('views', path.resolve(__dirname, './views/include'))


app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

//load routers
app.use('/', require('./server/routes/router'))



app.listen(PORT, () => console.log(`serving running at http://localhost:${PORT}`))