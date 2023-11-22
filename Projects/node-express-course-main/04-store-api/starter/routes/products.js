const express = require("express")
const router = express.Router()
const { getAllProductStatistics, getAllProducts } = require("../controllers/products")

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductStatistics)

module.exports = router