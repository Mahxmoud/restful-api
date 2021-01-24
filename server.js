const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const server = express()
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
server.post('/add', (req, res) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone
    })
    user.save()
        .then(data => {
            res.json(data)
        })
})


// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true
},
    () => console.log('connected to DB!')
)

server.listen(3000, (err) => {
    if (err) 
        console.log(err)
    else 
        console.log('server connected on 3000')
})