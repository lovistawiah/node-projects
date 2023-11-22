const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')


//local files
const { logger } = require('./middleware/logEvents')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const connectDB = require('./config/dbConn')
require('dotenv').config()
//initialize express app
const app = express()
connectDB();
//?         MIDDLEWARE

// ?        custom middleware
app.use(logger)
app.use(cors(corsOptions))



//? built-in middleware to handle urlencoded data - thus, for form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//? built-in middleware to handle json data
app.use(express.json())

// middleware for cookies
app.use(cookieParser())
//? built-in middleware to handle static files
app.use(express.static(path.join(__dirname, '/public')))


// routes
app.use('/', require('./routes/router'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/authUser'))
app.use('/logout', require('./routes/logout'))
app.use('/refresh', require('./routes/refreshToken'))

//? needs authorization to get,post an employee by using JWT
app.use(verifyJWT)
app.use('/employees', require('./routes/api/employee'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));
