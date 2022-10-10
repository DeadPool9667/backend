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
const CallDetail = require('../models/CallDetail')


//config ENV
dotenv.config();




router.get('/', async (req, res) => {
    let ticketId = req.body.id
    let data
    try {
        if(!ticketId){
            data = await CallDetail.find()
        } else {
            data = await CallDetail.find({Ticket:ticketId})
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

 router.post('/', async(req, res) => {

    try {
       let calls = new CallDetail({
        CallNumber: req.body.callNo,
        Attempts:req.body.attempts,
        serviceName:req.body.serviceName,
        Agent_ID:req.body.agentId,
        Agent_Name:req.body.agentName,
        Call_Start_Time:req.body.callStart,
        Call_End_Time:req.body.callEnd,
        Agent_Terminal:req.body.agentTerminal,
        Call_Service_DNI:req.body.callServiceDNI,
        Call_Destination:req.body.callDestination,
        Call_Type:req.body.callType,
        Disposition:req.body.dispostion,
        Sub_Disposition:req.body.subDisposition,
        UCID:req.body.ucid,
        Batchname:req.body.batchname,
        Ticket:req.body.id,
        HangupBy:req.body.hangUpBy,
        Call_Duration:req.body.callDuration,
        Call_Source: req.body.callSource
        })

        await calls.save()

        res.json({ 
            success: true, 
            data:calls
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

    try {
        let calls = await CallDetail.findByIdAndUpdate(req.params.id, 
            {
                CallNumber: req.body.callNo,
                Attempts:req.body.attempts,
                serviceName:req.body.serviceName,
                Agent_ID:req.body.agentId,
                Agent_Name:req.body.agentName,
                Call_Start_Time:req.body.callStart,
                Call_End_Time:req.body.callEnd,
                Agent_Terminal:req.body.agentTerminal,
                Call_Service_DNI:req.body.callServiceDNI,
                Call_Destination:req.body.callDestination,
                Call_Type:req.body.callType,
                Disposition:req.body.dispostion,
                Sub_Disposition:req.body.subDisposition,
                UCID:req.body.ucid,
                Batchname:req.body.batchname,
                Ticket:req.body.id,
                HangupBy:req.body.hangUpBy,
                Call_Duration:req.body.callDuration,
                Call_Source: req.body.callSource
            }, 
            {new:true})

        res.json({ 
            success: true, 
            data:calls
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
