const mongoose = require('mongoose')

// USER SCHEMA
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('User', UserSchema)