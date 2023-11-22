const express = require('express')
const route = express.Router()
const accounts = require('./database')


// Get request
route.get('/accounts', (req, res) => {
    res.json({ userData: accounts })
})


// Post requests
route.post('/accounts', (req, res) => {
    const incomingAccount = req.body
    accounts.push(incomingAccount)
    res.json(accounts)
})

route.get('/accounts/:id', (req, res) => {
    let id = Number(req.params.id)
    const getAccount = accounts.find((account) => account.id === id)
    if (!getAccount) {
        res.status(500).send(`user id: ${id} does not exist`)
    } else {
        res.json({ userData: getAccount })
    }
    // console.log(id)
})

// put http method
route.put('/accounts/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body;
    // get the id of the object (accounts)
    const account = accounts.find((account) => account.id == id)
    // find the index 
    const index = accounts.indexOf(account)
    if (!account) {
        // error message
        res.status(500).send("Account not found")
    } else {
        // spreading and emerging objects
        const updatedAccount = { ...account, ...body }
        console.log(updatedAccount)

        accounts[index] = updatedAccount
        res.send(updatedAccount)
    }
})

//delete request
route.delete('/accounts/:id', (req, res) => {
    const accountId = Number(req.params.id)
    const account = accounts.find((account) => account.id == accountId)
    const index = accounts.indexOf(account)
 const deletedOutput =  accounts.splice(index,1)
res.send(deletedOutput)
    res.end()
})

module.exports = route;