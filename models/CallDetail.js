const mongoose = require('mongoose') 

const CallDetailSchema = new mongoose.Schema({
    EnteredOn: {
        type:Date,
        default: Date.now
    },
    CallNumber: {
        type: Number,
        default:null
    },
    Attempts:{
        type: Number,
        default: 0
    },
    serviceName:{
        type:String,
        default:''
    },
    Agent_ID:{
        type:String,
        default:''
    },
    Agent_Name:{
        type:String,
        default:''
    },
    Call_Start_Time:{
        type:Date
    },
    Call_End_Time:{
        type:Date
    },
    Agent_Terminal:{
        type:Number,
        default:null
    },
    Call_Service_DNI:{
        type:Number,
        default:null
    },
    Call_Destination:{
        type:Number,
        default:null
    },
    Call_Type:{
        type:String,
        default:''
    },
    Disposition:{
        type:String,
        default:''
    },
    Sub_Disposition:{
        type:String,
        default:''
    },
    UCID:{
        type:String,
        default:''
    },
    Batchname:{
        type:String,
        default:''
    },
    Ticket:{
        type:String,
        default:''
    },
    HangupBy:{
        type:String,
        default:''
    },
    Call_Duration:{
        type:Number,
        default:null
    },
    Call_Source:{
        type:String,
        default:''
    }
})

module.exports = CallDetail = mongoose.model('calldetail', CallDetailSchema)

