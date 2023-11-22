const User = require('../model/User')

const jwt = require('jsonwebtoken');

require('dotenv').config()

// ? for file writing
// const userDB = {
//     users: require('../model/users.json')
// }

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt
    // const foundUser = userDB.users.find(user => user.refreshToken === refreshToken) -for file writing
    const foundUser = await User.find({ refreshToken }).exec()

    if (!foundUser) return res.sendStatus(401);//Unauthorized
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser[0].username !== decoded.username) return res.status(403).json(err)
            const roles = Object.values(foundUser[0].roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    )
}
module.exports = { handleRefreshToken }