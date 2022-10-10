const mongoose = require('mongoose') 

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    email_verified: {
        type: Date
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
    },
    updatedAt: { 
        type: Date, 
    },
    lastLoginAttempt: {
        type: Date
    },
    failedLoginAttemps:{
        type:Number
    },
    designation:{
        type:String,
        default: 'Admin'
    },
    department:{
        type:String,
        default: ''
    }
})

module.exports = User = mongoose.model('user', UserSchema)

