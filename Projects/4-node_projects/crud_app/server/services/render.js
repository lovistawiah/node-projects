const axios = require('axios')

module.exports = {
    homeRoutes: (req, res) => {
        axios.get('http://localhost:3000/api/users')
            .then(function (response) {
                // console.log(response.data)
                res.render('index', { users: response.data })
            }).catch(err => {
                res.send(err)
            })
    },
    add_user: (req, res) => {
        res.render('add_user')
    },
    update_user: (req, res) => {
        axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
            .then(function (userData) {
                console.log(userData.data)
                res.render('update_user', { user: userData.data })
            })
            .catch(err => {
                res.send(err);
            })
    },
    delete_user: (req, res) => {
        axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
            .then(function (userData) {
                res.render('update_use', { user: userData.data })
                // console.log(userData.data)
            })
            .catch(err => {
                res.send(err);
            })
    }
}