// ? use this module when writing to file
// const userDB = require('../model/users.json')
// const fsPromises = require('fs/promises')
// const path = require('path')
const bcrypt = require('bcrypt')
const User = require('../model/User')


const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "username and password required" })

    // const duplicate = userDB.find(person => person.username === username) -for files
    const duplicate = await User.findOne({ username: username }).exec()
    if (duplicate) return res.sendStatus(409)
    try {
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        //?store the new user for
        // const newUser = {
        //     "username": username,
        //     "roles": {
        //         "user": 2001
        //     },
        //     "password": hashedPassword,

        //? } - for files

        await User.create({
            "username": username,
            "password": hashedPassword
        })
        //? userDB.push(newUser) -for file writing
        // await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB))
        // console.log(userDB)
        // ? for file writing

        res.status(201).json({ "success": "New user created" })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }

}

module.exports = { handleNewUser };