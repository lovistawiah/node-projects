const mongoose = require('mongoose')
mongoose.set('strictQuery', false);


const connectDB = async () => {
    try {
        const connString = process.env.mongoURI
        //mongodb connection string
        const con = await mongoose.connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}


module.exports = connectDB