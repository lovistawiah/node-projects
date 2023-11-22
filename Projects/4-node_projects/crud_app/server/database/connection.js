const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectDB = () => {
    try {
        //mongodb connection string
        const con = mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        return con
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
module.exports = connectDB