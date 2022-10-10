const mongoose = require('mongoose') 

const ProductSchema = new mongoose.Schema({
    product: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
    },
    updatedAt: { 
        type: Date, 
    },
  
})

module.exports = Product = mongoose.model('product', ProductSchema)

