const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const server = express()

// REQUIRING USER MODEL
const User = require('./models/User')

const bodyParser = require('body-parser')

// PARSE DATA TO JSON FORMAT
server.use(bodyParser.json())

// GET ALL THE USERS
server.get('/', (req, res) => {
    const users = User.find({}, (req, user) => {
        res.send(user)
    }
    )
})

// ADD A NEW USER
server.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone
    })
    user.save()
        .then(data => {
            res.json(data)
        })
})

// GET USER BY ID
server.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

// DELETE USER
server.delete('/:userId', async (req, res) => {
    const removedUser = await User.remove({ _id: req.params.userId })
    res.json(removedUser)
})


// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true
},
    () => console.log('connected to DB!')
)

// LISTENING TO THE SERVER ON 3000 PORT
server.listen(3000, (err) => {
    if (err)
        console.log(err)
    else
        console.log('server connected on 3000')
})