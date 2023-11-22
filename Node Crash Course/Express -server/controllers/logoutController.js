// const fsPromises = require('fs/promises')
// const path = require('path')
// ? for file writing 👆

let User = require('../model/User')

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)//No content
    const refreshToken = cookies.jwt

    //Is refreshToken in Database
    // const foundUser = userDB.find(user => user.refreshToken === refreshToken)
    const foundUser = await User.findOne({ "refreshToken": refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);//No content
    }
    //Delete refreshToken in db
    // const otherUsers = userDB.filter(user => user.refreshToken !== foundUser.refreshToken)
    // const currentUser = { ...foundUser, refreshToken: '' }
    // userDB = [...otherUsers, currentUser]
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(userDB)
    // )

    // ? for file writing 👆

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
}
module.exports = { handleLogout }