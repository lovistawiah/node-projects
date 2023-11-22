// require("dotenv").config()
// const connectDb = require("./db/connect")
// const Product = require("./models/product")
// const jsonProducts = require("./products.json")

// const start = async () => {
//     try {
//         await connectDb(process.env.MONGO_URI)
//         await Product.deleteMany();
//         await Product.create(jsonProducts)
//         process.exit(0)
//         console.log("success!")
//     } catch (err) {
//         console.log(err)
//     }
// }
// start()