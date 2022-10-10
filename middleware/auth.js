const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN


module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({ msg: "No token, authorization denied"})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, `${JWT_AUTH_TOKEN}`)

        req.user = decoded.user
        next()
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid'})
    }
}