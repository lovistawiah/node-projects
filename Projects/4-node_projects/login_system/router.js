var express = require('express');
var router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}
// login 
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successfully")
    } else {
        res.end("Invalid Username");
    }
})
//dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.send("Unauthorized user");
    }
})
// logout
router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) { console.log(err) }
            else {
                res.render('base', { title: "Express Application", logout: "Logout Successfully...!" })
            }
        });

    }
});

module.exports = router;
