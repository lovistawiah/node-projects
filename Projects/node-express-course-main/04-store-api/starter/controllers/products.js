const Products = require("../models/product")
const getAllProductStatistics = async (req, res) => {
    const products = await Products.find({}).sort('-name price')

    res.status(200).json({ products })
}
const getAllProducts = async (req, res) => {
    const { features, company, name, sort, fields, numericFilters } = req.query
    const queryObjects = {}
    if (features) {
        queryObjects.features = features === "true" ? true : false
    }
    if (company) {
        queryObjects.company = { $regex: company, $options: 'i' }
    }
    if (name) {
        queryObjects.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$e',
            '<=': '$lte',
            '<': '$lt'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(",").forEach(item => {
            const [field, operator, value] = item.split("-")
            if (options.includes(field)) {
                queryObjects[field] = { [operator]: Number(value) }
            }
        })
    }
    let result = Products.find(queryObjects)
    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    } else {
        result = result.sort('name')
    }
    if (fields) {
        let fieldNames = fields.split(",").join(" ")
        result = result.select(fieldNames)
    }
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductStatistics,
    getAllProducts
}