const jwt = require('jsonwebtoken')
require('dotenv').config()


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)//Unauthorized
    const token = authHeader.split(' ')[1]
    console.log(`token:${token}`)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json(err);
            //? req.username is the set in jwt.sign object properties
            req.username = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT;