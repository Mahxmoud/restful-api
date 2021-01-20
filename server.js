const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const server = express()
const User = require('./models/User')



server.get('/user', (req, res) => {
    User.find({}, (req, data) =>
        console.log(data)
    )
})
// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true
},
    () => console.log('connected to DB!')
)
server.listen(3000)