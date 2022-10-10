const express = require('express') 
const {check, validationResult, cookie} = require('express-validator') 
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const auth = require('../middleware/auth')
const dotenv = require('dotenv');
const crypto = require('crypto');
const Product = require('../models/Product')


//config ENV
dotenv.config();




router.get('/', async (req, res) => {

    try {
        let data = await Product.find()

        res.json({ 
            success: true, 
            data
         })
    } catch (err) {
        res.json({ 
            success: false, 
            errors:{
                message: err.message
            }
         })
    }
  
 })

 router.post('/', async(req, res) => {
    let prod = req.body.product

    try {
        product = new Product({
                 product: prod
             })
        await product.save()

        res.json({ 
            success: true, 
            data:product
         })
    } catch (err) {
        res.json({ 
            success: false, 
            errors:{
                message: err.message
            }
         })
    }
 })
 
 router.put('/:id', async(req, res) => {
    let prod = req.body.product

    try {
        let product = await Product.findByIdAndUpdate(req.params.id, {product:prod}, {new:true})

        res.json({ 
            success: true, 
            data:product
         })

    } catch (err) {
        res.json({ 
            success: false, 
            errors:{
                message: err.message
            }
         })
    }
 })

 module.exports = router
