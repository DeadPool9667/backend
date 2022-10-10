const express = require('express') 
const {check, validationResult, cookie} = require('express-validator') 
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const auth = require('../middleware/auth')
const dotenv = require('dotenv');
const crypto = require('crypto');
const Farmer = require('../models/Farmer')


//config ENV
dotenv.config();




router.post('/', async (req, res) => {

    let mobile = req.body.mobileNo
    let data 
    try {
        if(!mobile){
            data = await Farmer.find()
        } else {
            data = await Farmer.findOne({PhoneNumber: mobile})
        }

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

 router.post('/create', async(req, res) => {

    try {
        let farmer = Farmer.findById(req.body.farmerId)
        if(farmer){
            farmer = Farmer.findByIdAndUpdate(req.body.farmerId, {
                Name: req.body.name,
                PhoneNumber: req.body.mobileNo,
                AcreAge1: req.body.acreAge1,
                AcreAge2: req.body.acreAge2,
                AcreAge3: req.body.acreAge3
            }, 
            {new:true})
        }
        farmer = new Farmer({
            Name: req.body.farmerName,
            PhoneNumber: mobile
        })

        await farmer.save()

        res.json({ 
            success: true, 
            data:farmer
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
    let fname = req.body.farmerName
    let number = req.body.mobileNo

    try {
        let farmer = await Farmer.findByIdAndUpdate(req.params.id, {Name:fname, PhoneNumber:number }, {new:true})

        res.json({ 
            success: true, 
            data:farmer
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
