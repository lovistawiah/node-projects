const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')


// load env vars
dotenv.config({ path: './config/config.env' })
const app = express()

// connecting to database
connectDB();

//body-parser
app.use(express.json())

// enable cors
app.use(cors())

// set static folder
app.use(express.static(path.join(__dirname,'public')))

//morgan logs
app.use(morgan('tiny'))

app.use('/api/v1/stores', require('./routes/stores'))
const PORT = process.env.PORT || 5000
//listening 
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT} at http://localhost:${PORT}`))