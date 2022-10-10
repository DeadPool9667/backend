const mongoose = require('mongoose') 

const TicketSchema = new mongoose.Schema({
    FarmerName: {
        type: String,
        default:''
    },
    BatchName: {
        type: String,
        default:''
    },
    attempts: {
        type: Number,
        default:''
    },
    MobileNo: {
        type: Number,
        required: true
    },
    Ticket_Inserted_Date: {
        type: Date
    },
    Ticket_Created_At: { 
        type: Date, 
        default: Date.now, 
    },
    TicketNumber: { 
        type: String, 
        unique:true
    },
    State: {
        type: String
    },
    Pincode:{
        type:String
    },
    District:{
        type:String
    },
    Tehsil:{
        type:String,
        default:''
    },
    Village:{
        type:String,
        default:''
    },
    OtherDistrict:{
        type:String,
        default:''
    },
    OtherTehsil:{
        type:String,
        default:''
    },
    OtherVillage:{
        type:String,
        default:''
    },
    Product_1:{
        type:String,
        default:''
    },
    Product_2:{
        type:String,
        default:''
    },
    Product_3:{
        type:String,
        default:''
    },
    Crop_1:{
        type:String,
        default:''
    },
    Crop_2:{
        type:String,
        default:''
    },
    Crop_3:{
        type:String,
        default:''
    },
    Sale_S1:{
        type:String,
        default:''
    },
    Sale_S2:{
        type:String,
        default:''
    },
    Sale_S3:{
        type:String,
        default:''
    },
    Reg_Name:{
        type:String,
        default:''
    },
    Reg_Type:{
        type:String,
        default:''
    },
    ECN:{
        type:Number,
        default: null
    },
    Data_Source:{
        type: String
    },
    QueryRaised:{
        type: String,
        default:''
    },
    CallType:{
        type: String,
        default:''
    },
    CallSource:{
        type: String,
        default:''
    },
    Solution:{
        type: String,
        default:''
    },
    AcreAge1: {
        type: String,
        default:''
    },
    AcreAge2: {
        type: String,
        default:''
    },
    AcreAge3: {
        type: String,
        default:''
    },
    Department:{
        type: String,
        default:''
    },
    Status:{
        type: String,
        enum: ['open', 'close'],
        default: 'open'
    },
    Remarks:{
        type: String,
        default:''
    },
    CallRelated:{
        type: String,
        default: ''
    },
    MediaClient:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'upload'
    }],
    MediaResponse:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'upload'
    }],
    Updated_At:{
        type: Date,
        default:''
    },
    Connect_Status:{
        type:String,
        default:''
    },
    ForCrop:{
        type:String,
        default:''
    },
    ForProduct:{
        type:String,
        default:''
    },
    Agent:{
        type:String,
        default:''
    }
})

module.exports = Ticket = mongoose.model('ticket', TicketSchema)

