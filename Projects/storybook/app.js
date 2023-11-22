const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')



//require local files
const connectDB = require('./config/db')
const { NewUser } = require('./models/Story')



//? load config file
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport);

//load Database connection
connectDB()

const app = express()

//Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// Session store
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    //? used to create session in database
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, })
}));
//Static folder
app.use(express.static(path.join(__dirname, './public')))

// Handle bars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//? passport middleware should in use before the routes
app.use(passport.initialize())
app.use(passport.session())
// Static folder

// ? routes 
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

// ? run morgan in dev mode only
app.use(morgan('dev'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))