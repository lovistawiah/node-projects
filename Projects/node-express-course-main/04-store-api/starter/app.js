require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');
const connectDb = require("./db/connect")

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productsRouter = require("./routes/products");
// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan("dev"))

//routes
app.get("/", (req, res) => {
    res.send("hello, world")
})

//products routes
app.use("/api/v1/products", productsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening at http://localhost:${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
