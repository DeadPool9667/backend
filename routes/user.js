const express = require('express') 
const {check, validationResult, cookie} = require('express-validator') 
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const auth = require('../middleware/auth')
const dotenv = require('dotenv');
const crypto = require('crypto');


//config ENV
dotenv.config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN



router.get('/', async (req, res) => {

    try {
        let data = await User.find()

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


 //login user
 router.post('/login',
 [
     check('username', 'Username is required').exists(),
     check('password', 'Password is required').exists()
 ], 
 async (req, res) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() })
     }
 
     const { username, password } = req.body;

     const lastLogin = Date.now()
 
     try{
         let user = await User.findOne({ username })
         if(!user){
             return res.status(400).json({errors:[{msg: 'Invalid Username or Password'}]})
         }
 
         const isMatch = await bcrypt.compare(password, user.password)
 
         if(!isMatch){
            user = await User.findOneAndUpdate({username}, {lastLoginAttempt: lastLogin, $inc : {'failedLoginAttemps' : 1}}, {new:true})
            return res.status(400).json({errors:[{msg: 'Invalid Username or Password'}]})
         }

            user = await User.findOneAndUpdate({username}, {lastLoginAttempt: lastLogin}, {new:true})
 
         const payload = {
             user: {
                 id: user.id
             }
         }
         jwt.sign(
             payload, 
             JWT_AUTH_TOKEN,
             {expiresIn: 604800},
             (err, token) => {
                 if(err) throw err
                 res.json({success:true, data:token})
             }
             )
 
     } catch(err) {
         console.error(err.message)
         res.status(500).send('Server Error')
     }
 }) 


 //register user
 router.post('/register',[
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password should be atleast 4 characters').isLength({min: 4}) 
 ], async (req, res) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array()})
     }
 
     //send error if user already exists
     let user = await User.findOne({username: req.body.username})
     if(user){
         return res.status(400).json({errors:[{msg: 'Username already exists'}]})
     } else {
         try {
             //create new user if not already there
             user = new User({
                 username: req.body.username,
                 password: req.body.password
             })
 
             //encrypt pass
             const salt = await bcrypt.genSalt(15);
             user.password = await bcrypt.hash(user.password, salt)
 
             await user.save()
 
             const payload = {
                 user: {
                     id: user.id
                 }
             }
             jwt.sign(
                 payload, 
                 'secrettoken',
                 {expiresIn: 36000},
                 (err, token) => {
                     if(err) throw err
                     res.json({success:true, data:token })
                 }
                 )
             
         } catch (err) {
             console.error(err.message)
             res.status(500).send('Server Error')
         }
         
     }
 })


module.exports = router
