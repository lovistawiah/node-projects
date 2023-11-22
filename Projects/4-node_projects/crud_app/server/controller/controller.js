var Userdb = require('../model/model')

// create and save new user
exports.create = (req, res) => {
    // validate requests
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty" })
        return;
    }
    // new user
    const body = req.body;
    const user = new Userdb({

        name: body.name,
        email: body.email,
        gender: body.gender,
        status: body.status

    });
    // save user in the database
    user
        .save(user)
        .then(data => {
            res.render('/add-user')
            // res.send(data)

        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred when creating user " })
        })
}
// retrieve and return all user or single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send(`${id} not found`)
                } else {
                    res.send(data)
                }
            }).catch(err => {
                res.status(500).send({ message: err.message })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred when finding user" })
            })
    }

}
// update a new user
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content is empty" })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send(`${id} is not found`)
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })
}
// delete user using user id
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `${id} not found` })
            } else {
                res.send({ message: `${req.body.name} deleted successfully` })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}
