const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })
        //console the connection host of mongoDB
        console.log(`mongoDB connected.... ${con.connection.host}`)
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB