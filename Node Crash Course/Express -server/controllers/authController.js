const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const fsPromises = require('fs/promises')
// const path = require('path')
require('dotenv').config()
const User = require('../model/User')

// let usersDb = require('../model/users.json')

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "username and password required" })

    // const foundUser = usersDb.find(user => user.username === username) -for file writing
    
    const foundUser = await User.findOne({ "username": username }).exec()
    if (!foundUser) return res.sendStatus(401);//Unauthorized

    try {
        const match = await bcrypt.compare(password, foundUser.password)
        if (match) {
            const roles = Object.values(foundUser.roles)
            //create JWT
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '50s' }
            );

            const refreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' },
            );
            // ?for file writing start
            // const otherUsers = usersDb.filter(person => person.username !== foundUser.username)
            // const currentUser = { ...foundUser, refreshToken }

            // usersDb = [...otherUsers, currentUser]
            // await fsPromises.writeFile(
            //     path.join(__dirname, '..', 'model', 'users.json'),
            //     JSON.stringify(usersDb)
            // )
            // ? /end

            foundUser.refreshToken = refreshToken;
            await foundUser.save()
            res.cookie('jwt', refreshToken,
                // ?comment secure:true when using thunder client
                { httpOnly: true, sameSite: 'None', /*secure: true,*/ maxAge: 24 * 60 * 60 * 1000 }
            )
            res.json({ accessToken })
        } else {
            res.status(401).json({ "message": "Unauthorized" })
        }
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}
module.exports = { handleLogin }