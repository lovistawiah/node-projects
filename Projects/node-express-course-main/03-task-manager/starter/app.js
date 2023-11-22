const express = require("express")
const tasks = require("./routes/tasks")
const connectDB = require("./db/connection")
const morgan = require("morgan")
require("dotenv").config()
const notFound = require("./middleware/not-found")


const app = express()

app.use(express.static("./public"))
app.use(express.json())
app.use(morgan("dev"))


app.use("/api/v1/tasks", tasks)
app.use(notFound)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`listening at http://localhost:${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()