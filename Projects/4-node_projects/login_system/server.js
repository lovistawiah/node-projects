const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = require('./router');


// 
const PORT = process.env.PORT || 3000

// load static assets
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// NOTE: adding assets (images) to node application 
// assets - folder containing files of images etc
// app.use('/assets',path.join(__dirname,'/public/assets'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/route', router)


// html template engine generator
app.set("view engine", "ejs");


// home route
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" });
});

// port listening
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));