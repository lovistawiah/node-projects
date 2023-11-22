const jwt = require("jsonwebtoken")

const customAPIError = require("../errors/custom-error")

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new customAPIError("Please provide email or password", 400)
    }
    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    if (!req.user) {
        throw new customAPIError("Not authorized to access this route")
    }
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `Here is your lucky number ${luckyNumber}` })
}

module.exports = {
    dashboard,
    login
}