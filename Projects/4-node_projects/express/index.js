const express = require('express');
const app = express();
const cookies = require('cookie-parser')
// const session = require('express-session')

// require path when rendering the views
// const path = require('path');
app.use(cookies());
let users = {
    name: "john",
    age: 28
}
app.get('/', (req, res) => {
    res.send("Cookies Tutorial")
})

app.get('/set-user', (req, res) => {
    res.cookie("userData", users)
    res.end("Cookies set")
})
app.get('/logout', (req, res) => {
    res.clearCookie("userData")
    res.send("Cookies destroyed")
})
app.get('/get-user', (req, res) => {
    res.send(req.cookies)
})
const PORT = process.env.PORT || 3000;
































// NOTE: initializing  session
// app.use(session({
//     secret: "Your secret key",
//     resave: true,
//     saveUninitialized: true
// }))

// NOTE: Creating session
// app.get('/', (req, res) => {
//     req.session.name = "John";
//     return res.send('Session sent');
// })

// NOTE: accessing session variables
// app.get('/session', (req, res) => {
//     var name = req.session.name
//     return res.send(name)
// })

// Destroying session
// app.get('/destroy', (req, res) => {
//     req.session.destroy((err) => {
//         console.log(err)
//     })
//     res.send("Session destroyed")
// })




















// POSTING FORM DATA IN NODE USING EXPRESS
// app.set('views', path.join(__dirname, "views"))
// app.set("view engine", "pug")
// app.use(express.urlencoded({
//     extended: true
// }))
// app.get('/', (req, res) => {
//     res.render("index", { title: "Form handling" });
// })

// app.post('/form_submit', (req, res) => {
//     const user = req.body.username;
//     const email = req.body.email;
//     res.end(`Username is ${user} and email is ${email}`)
//     console.log(`${user} ${email}`)
// })

app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))