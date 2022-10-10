const express = require('express') 
const {check, validationResult, cookie} = require('express-validator') 
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const auth = require('../middleware/auth')
const dotenv = require('dotenv');
const crypto = require('crypto');
const Ticket = require('../models/Ticket')
const Farmer = require('../models/Farmer')
const auth = require('../middleware/auth')
const moment = require('moment')



//config ENV
dotenv.config();




router.get('/', auth, async (req, res) => {
    let user = await User.findById(req.user.id)
    let userDepartment = user.department
    let data
    try {
        if(userDepartment === '' || userDepartment === null || userDepartment === undefined){
            data = await Ticket.find()
        } else {
            data = await Ticket.find({Department:userDepartment})
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

 router.get('/:id', auth, async (req, res) => {
    let user = await User.findById(req.user.id)
    let userDepartment = user.department
    let data
    // console.log(req.user)
    try {
        if(userDepartment === '' || userDepartment === null || userDepartment === undefined){
            data = await Ticket.findById(req.params.id)
        } else {
            data = await Ticket.find({_id:req.params.id,Department:userDepartment})
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

 router.post('/mobile',auth, async (req, res) => {
    let mobileNo = req.body.mobileNo
    let user = await User.findById(req.user.id)
    // console.log(user)
    let userDepartment = user.department
    let data
    let monthData=new Date();
    monthData.setMonth(monthData.getMonth());

    try {
        if(userDepartment === '' || userDepartment === null || userDepartment === undefined){
            data = await Ticket.find({MobileNo: mobileNo})
        } else {
            data = await Ticket.find({Department:userDepartment, MobileNo: mobileNo})
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
    let farmerName = req.body.farmerName
    let batchname = req.body.batchname
    let attempts = req.body.attempts
    let mobile = req.body.mobileNo.toString()
    let ticketInsertedDate = req.body.ticketInsertedDate
    let ticketNumber = req.body.ticketNumber
    let state = req.body.state
    let district = req.body.district
    let tehsil = req.body.tehsil
    let village = req.body.village
    let prod1 = req.body.product1
    let prod2 = req.body.product2
    let prod3 = req.body.product3
    let crop1 = req.body.crop1
    let crop2 = req.body.crop2
    let crop3 = req.body.crop3
    let reg_name = req.body.regName
    let ecn = req.body.ecn
    let dataSource = req.body.dataSource
    let queryRaised = req.body.queryRaised
    let callType = req.body.callType
    let callRelated = req.body.callRelated
    let callSource = req.body.callSource
    let solution = req.body.solution
    let department = req.body.department
    let remarks = req.body.remarks
    let mediaClient = req.body.mediaClient
    let acreAge1 = req.body.acreAge1
    let acreAge2 = req.body.acreAge2
    let acreAge3 = req.body.acreAge3
    let pinCode = req.body.pinCode

    let othdistrict = req.body.othDistrict
    let othtehsil = req.body.othTehsil
    let othvillage = req.body.othVillage
    let mediaResponse = req.body.mediaResponse
    let connectStatus = req.body.connectStatus

    let farmer
    let ticket
    let savedFarmer

    // console.log(req.body.mobileNo.toString().length)

    if(mobile.length !== 10){
        return res.status(400).json({errors:[{msg: 'Mobile number must be 10 digits long'}]})
    }

    if(req.body.id)
        ticket = await Ticket.findById(req.body.id)
        // console.log(ticket)
  
    try {
        farmer = await Farmer.findOne({PhoneNumber:mobile})

        if(farmer){
            savedFarmer = await Farmer.findOneAndUpdate({PhoneNumber:mobile}, {
                Name: req.body.name,
                PhoneNumber: req.body.mobileNo,
                AcreAge1: req.body.acreAge1,
                AcreAge2: req.body.acreAge2,
                AcreAge3: req.body.acreAge3
            }, 
            {new:true})
            // console.log('savedFarmer', savedFarmer)
        } else {
            farmer = new Farmer({
                Name: req.body.farmerName,
                PhoneNumber: mobile,
                AcreAge1: req.body.acreAge1,
                AcreAge2: req.body.acreAge2,
                AcreAge3: req.body.acreAge3
            })    

            savedFarmer = await farmer.save()

        }

        if(!ticket){
            // console.log('no ticket')
            if(!ticketNumber){
                ticketNumber =  Math.random().toString(36).slice(2)
            } 

            ticket = await Ticket.findOne({TicketNumber:ticketNumber})
            if(ticket){
                return res.status(400).json({errors:[{msg: 'Ticket Number Already Exists'}]})
            }
            // console.log(req.body.agent)

            
                // let foundTicket = Ticket.find({TicketNumber:ticketNumber})
            ticket = new Ticket({
                FarmerName: farmerName,
                BatchName: batchname,
                attempts: attempts,
                MobileNo: mobile,
                Ticket_Inserted_Date: ticketInsertedDate,
                TicketNumber: ticketNumber,
                State: state,
                District:district,
                Tehsil:tehsil,
                Village:village,
                Product_1:prod1,
                Product_2:prod2,
                Product_3:prod3,
                Crop_1:crop1,
                Crop_2:crop2,
                Crop_3:crop3,
                Reg_Name:reg_name,
                ECN:ecn,
                Data_Source:dataSource,
                QueryRaised:queryRaised,
                CallType:callType,
                CallSource:callSource,
                CallRelated:callRelated,
                Solution:solution,
                Department:department,
                Remarks:remarks,
                MediaClient:mediaClient,
                AcreAge1: acreAge1,
                AcreAge2: acreAge2,
                AcreAge3: acreAge3,
                Pincode: pinCode,
                OtherDistrict: othdistrict,
                OtherTehsil:othtehsil,
                OtherVillage:othvillage,
                Connect_Status:connectStatus,
                ForCrop:req.body.forCrop,
                ForProduct: req.body.forProduct,
                Reg_Type: req.body.regType,
                Agent: req.body.agent
            })

            // farmer = await Farmer.findOne({PhoneNumber:mobile})

            savedFarmer.Tickets.unshift(ticket)

            await ticket.save()
            await savedFarmer.save()

            res.json({ 
                success: true, 
                data:ticket
            })
        } else {
            // console.log('Else statement')
            let updatedAt = new Date().toISOString()   

            let farmer = await Farmer.findOneAndUpdate({PhoneNumber:mobile}, 
            {
                FarmerName: farmerName,
                AcreAge1: acreAge1,
                AcreAge2: acreAge2,
                AcreAge3: acreAge3
            },{new:true})

            // console.log(req.body.agent)

            let ticket = await Ticket.findByIdAndUpdate(req.body.id, {
                FarmerName: farmerName,
                BatchName: batchname,
                attempts: attempts,
                MobileNo: mobile,
                Ticket_Inserted_Date: ticketInsertedDate,
                TicketNumber: ticketNumber,
                State: state,
                District:district,
                Tehsil:tehsil,
                Village:village,
                Product_1:prod1,
                CallRelated:callRelated,
                Product_2:prod2,
                Product_3:prod3,
                Crop_1:crop1,
                Crop_2:crop2,
                Crop_3:crop3,
                Reg_Name:reg_name,
                ECN:ecn,
                Data_Source:dataSource,
                QueryRaised:queryRaised,
                CallType:callType,
                CallSource:callSource,
                Solution:solution,
                Status: req.body.status,
                Department:department,
                Remarks:remarks,
                MediaResponse:mediaResponse,
                AcreAge1: acreAge1,
                AcreAge2: acreAge2,
                AcreAge3: acreAge3,
                Pincode: pinCode,
                Updated_At: updatedAt,
                OtherDistrict: othdistrict,
                OtherTehsil:othtehsil,
                OtherVillage:othvillage,
                Connect_Status:connectStatus,
                ForCrop:req.body.forCrop,
                ForProduct: req.body.forProduct,
                Reg_Type: req.body. regType,
                Agent: req.body.agent
            }, 
            {new:true})
            
            res.json({ 
                success: true, 
                data:ticket
            })
        }
    } catch (err) {
        res.json({ 
            success: false, 
            errors:{
                message: err.message
            }
         })
    }
 })
 
 router.put('/:id',auth, async(req, res) => {
    let othdistrict = req.body.othDistrict
    let othtehsil = req.body.othTehsil
    let othvillage = req.body.othVillage
    let dataSource = req.body.dataSource
    let queryRaised = req.body.queryRaised
    let callType = req.body.callType
    let callSource = req.body.callSource
    let solution = req.body.solution
    let department = req.body.department
    let remarks = req.body.remarks
    let mediaResponse = req.body.mediaResponse
    let attempts = req.body.attempts
    let acreAge1 = req.body.acreAge1
    let acreAge2 = req.body.acreAge2
    let acreAge3 = req.body.acreAge3
    let connectStatus = req.body.connectStatus

    let updatedAt = new Date().toISOString()
    

    try {
        let ticket = await Ticket.findByIdAndUpdate(req.params.id, {
            attempts: attempts,
            OtherDistrict:othdistrict,
            OtherTehsil:othtehsil,
            OtherVillage:othvillage,
            Data_Source:dataSource,
            QueryRaised:queryRaised,
            CallType:callType,
            CallSource:callSource,
            CallRelated:callRelated,
            Solution:solution,
            Department:department,
            Remarks:remarks,
            MediaResponse:mediaResponse,
            Status: req.body.status,
            Updated_At: updatedAt,
            AcreAge1: acreAge1,
            AcreAge2: acreAge2,
            AcreAge3: acreAge3,
            Connect_Status:connectStatus,
            ForCrop:req.body.forCrop,
            ForProduct: req.body.forProduct,
            Reg_Type: req.body.regType,
            Agent: req.body.agent
        }, 
        {new:true})

        res.json({ 
            success: true, 
            data:ticket
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

 router.post('/get/count', auth, async(req, res) => {
    let ticketCount
    let mobile = req.body.mobileNo
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let status = req.body.status

    // console.log(moment(startDate).format())
    try{
        if(mobile && mobile.length !== 0 && !startDate && !endDate && !status){
            ticketCount = await Ticket.count({
                MobileNo: mobile
            })
        } else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && !endDate && !status){
            ticketCount = await Ticket.count({
                MobileNo: mobile,
                Ticket_Created_At:{$gte : moment(startDate).format()}
            })
        } else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && !status){
            ticketCount = await Ticket.count({
                MobileNo: mobile,
                $and:[
                    {Ticket_Created_At:{$gte : moment(startDate).format()}},
                    {Ticket_Created_At:{$lte : moment(endDate).format()}}
                    ]
            })
        } else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && status && status.length !== 0){
            ticketCount = await Ticket.count({
                MobileNo: mobile,
                $and:[
                    {Ticket_Created_At:{$gte : moment(startDate).format()}},
                    {Ticket_Created_At:{$lte : moment(endDate).format()}}
                    ],
                Status: status
            })
        } else if(!mobile && !startDate && !endDate && status && status.length !== 0){
            ticketCount = await Ticket.count({
                Status: status
            })
        } else if(mobile && mobile.length !== 0 && !startDate && !endDate && status && status.length !== 0){
            ticketCount = await Ticket.count({
                Status: status,
                MobileNo:mobile
            })
        }  else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && !endDate && status && status.length !== 0){
            ticketCount = await Ticket.count({
                Status: status,
                MobileNo:mobile,
                Ticket_Created_At:{$gte : moment(startDate).format()}
            })
        }   else if(mobile && mobile.length !== 0 && !startDate && endDate && endDate.length !== 0 && status && status.length !== 0){
            ticketCount = await Ticket.count({
                Status: status,
                MobileNo:mobile,
                Ticket_Created_At:{$lte : moment(endDate).format()}
            })
        }  else if(!mobile && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && status && status.length !== 0){
            ticketCount = await Ticket.count({
                Status: status,
                $and:[
                    {Ticket_Created_At:{$gte : moment(startDate).format()}},
                    {Ticket_Created_At:{$lte : moment(endDate).format()}}
                    ]
            })
        }   else if(!mobile && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && !status){
            ticketCount = await Ticket.count({
                $and:[
                {Ticket_Created_At:{$gte : moment(startDate).format()}},
                {Ticket_Created_At:{$lte : moment(endDate).format()}}
                ]
            })
        }   else if(!mobile && startDate && startDate.length !== 0 && !endDate && !status){
            // console.log(moment(startDate).format(), startDate)
            ticketCount = await Ticket.count({
                Ticket_Created_At:{$gte : moment(startDate).format()}
            })
        }   else if(!mobile && !startDate && endDate && endDate.length !== 0 && !status){
            ticketCount = await Ticket.count({
                Ticket_Created_At:{$lte : moment(endDate).format()}
            })
        } else if(!mobile && startDate && startDate.length !== 0 && !endDate  && status && status.length !== 0){
            ticketCount = await Ticket.count({
                Ticket_Created_At:{$gte : moment(startDate).format()},
                Status: status
            })
        }
        // ticketCount = await Ticket.count({
        //     $or:[
        //         {MobileNo: mobile},
        //         {Ticket_Created_At:{$gte : startDate}},
        //         {Ticket_Created_At:{$lte : endDate}},
        //         {Status: status}
        //     ]
        // })
        res.json({ 
            success: true, 
            data:ticketCount
         })
    }catch(err){
        res.json({ 
            success: false, 
            errors:{
                message: err.message
            }
         })
    }
 })


 router.post('/filter/',auth,async(req, res) => {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let mobile = req.body.mobileNo
    // if(req.body.startDate)
    //     startDate = new Date(req.body.startDate)
    // if(req.body.endDate)
    //     endDate = new Date(req.body.endDate)
    let status = req.body.status
    let ticket
    let skip
    let limit
    let size

    try {
        let page = req.body.page
        if(!page){
            page = 1
        }

        if(!req.body.noPage){
            size = 50
            limit = 50
            skip = (page - 1) * size
        } else {
            size = 5000
            limit = 5000
            skip = (page - 1) * size
        }

        if(mobile && mobile.length !== 0 && !startDate && !endDate && !status){
            ticket = await Ticket.find({
                MobileNo: mobile
            },{}, {sort: '-_id', limit: limit, skip: skip})
        } else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && !endDate && !status){
            ticket = await Ticket.find({
                MobileNo: mobile,
                Ticket_Created_At:{$gte : moment(startDate).format()}
            },{}, {sort: '-_id', limit: limit, skip: skip})
        } else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && !status){
            ticket = await Ticket.find({
                MobileNo: mobile,
                $and:[
                    {Ticket_Created_At:{$gte : moment(startDate).format()}},
                    {Ticket_Created_At:{$lte : moment(endDate).format()}}
                    ]
            },{}, {sort: '-_id', limit: limit, skip: skip})
        } else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && status && status.length !== 0){
            ticket = await Ticket.find({
                MobileNo: mobile,
                $and:[
                    {Ticket_Created_At:{$gte : moment(startDate).format()}},
                    {Ticket_Created_At:{$lte : moment(endDate).format()}}
                    ],
                Status: status
            },{}, {sort: '-_id', limit: limit, skip: skip})
        } else if(!mobile && !startDate && !endDate && status && status.length !== 0){
            ticket = await Ticket.find({
                Status: status
            },{}, {sort: '-_id', limit: limit, skip: skip})
        } else if(mobile && mobile.length !== 0 && !startDate && !endDate && status && status.length !== 0){
            ticket = await Ticket.find({
                Status: status,
                MobileNo:mobile
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }  else if(mobile && mobile.length !== 0 && startDate && startDate.length !== 0 && !endDate && status && status.length !== 0){
            ticket = await Ticket.find({
                Status: status,
                MobileNo:mobile,
                Ticket_Created_At:{$gte : moment(startDate).format()}
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }   else if(mobile && mobile.length !== 0 && !startDate && endDate && endDate.length !== 0 && status && status.length !== 0){
            ticket = await Ticket.find({
                Status: status,
                MobileNo:mobile,
                Ticket_Created_At:{$lte : endDate}
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }  else if(!mobile && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && status && status.length !== 0){
            ticket = await Ticket.find({
                Status: status,
                $and:[
                    {Ticket_Created_At:{$gte : moment(startDate).format()}},
                    {Ticket_Created_At:{$lte : moment(endDate).format()}}
                    ]
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }   else if(!mobile && startDate && startDate.length !== 0 && endDate && endDate.length !== 0 && !status){
            ticket = await Ticket.find({
                $and:[
                {Ticket_Created_At:{$gte : moment(startDate).format()}},
                {Ticket_Created_At:{$lte : moment(endDate).format()}}
                ]
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }   else if(!mobile && startDate && startDate.length !== 0 && !endDate && !status){
            // console.log(moment(startDate).format(), startDate)
            ticket = await Ticket.find({
                Ticket_Created_At:{$gte : moment(startDate).format()}
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }   else if(!mobile && !startDate && endDate && endDate.length !== 0 && !status){
            ticket = await Ticket.find({
                Ticket_Created_At:{$lte : moment(endDate).format()}
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }   else if(!mobile && startDate && startDate.length !== 0 && !endDate  && status && status.length !== 0){
            // console.log("im here")
            ticket = await Ticket.find({
                Ticket_Created_At:{$gte : moment(startDate).format()},
                Status: status
            },{}, {sort: '-_id', limit: limit, skip: skip})
        }

        // ticket = await Ticket.find({
        //     $or:[
        //     {MobileNo: mobile},
        //     {Ticket_Created_At:{$gte : startDate}},
        //     {Ticket_Created_At:{$lte : endDate}},
        //     {Status: status}
        // ]
        // },{}, {sort: '-_id', limit: limit, skip: skip})


        res.json({ 
            success: true, 
            data:ticket
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
