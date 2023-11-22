const Store = require('../models/store')


// @description Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find()
        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

// @description Create a store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body)
        return res.status(200).json({
            success: true,
            count: store.length,
            data: store
        })
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send('This store already exists')
        }
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}