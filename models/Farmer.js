const mongoose = require('mongoose') 

const FarmerSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    PhoneNumber: {
        type: Number,
        unique: true
    },
    AcreAge1: {
        type: String
    },
    AcreAge2: {
        type: String
    },
    AcreAge3: {
        type: String
    },
    Tickets:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticket'
    }],
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date
    }
})

module.exports = Farmer = mongoose.model('farmer', FarmerSchema)

