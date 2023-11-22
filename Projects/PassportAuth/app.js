const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')

//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/key').MONGO_URI
mongoose.set('strictQuery', false)


//connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

//initializer
const app = express();

app.use(expressLayouts)
//View engine
app.set('view engine', 'ejs')

//body Parser
app.use(express.urlencoded({ extended: true }))


// Expression Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
})

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`local server running at http://localhost:${PORT}`))