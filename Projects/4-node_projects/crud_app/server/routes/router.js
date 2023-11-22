const express = require('express')
const route = express.Router();
const controller = require('../controller/controller')
const services = require('../services/render')
// home route
route.get('/', services.homeRoutes)

// add user page
route.get('/add-user', services.add_user)

// update user
route.get('/user/update', services.update_user)

//delete user
route.get('/user/delete', services.delete_user)


//API
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.delete('/api/users/:id',controller.delete)
route.put('/api/users/:id',controller.update)


module.exports = route