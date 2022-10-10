const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UploadSchema = new Schema({
    ForTicket: {
        type: String,
        required: true
    },
    FileName: {
        type: String,
    },
    FilePath: {
        type: String,
    },
    FileType: {
        type: String,
    },
    FileSize: {
        type: String,
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    updatedAt: {
        type:Date,
    },
    isDeleted:{
        type:Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = Upload = mongoose.model('upload', UploadSchema);