const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const app = express()
dotenv.config({ path: './config/config.env' })
// connect to mongo database
connectDB();

// middleware
app.use(express.json({ extended: false }))

// Define routes

app.use('/',require('./routes/index'))
app.use('/api/url',require('./routes/url'))
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server running at  http://localhost:${PORT}`))
