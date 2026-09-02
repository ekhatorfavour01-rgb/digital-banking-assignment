const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    bvn: {
        type: String,
        unique: true,
        sparse: true
    },
    nin: {
        type: String,
        unique: true,
        sparse: true
    },
    isVerified: {
        type: Boolean,
        defalut: false
    },
    dob: {
        type: String
    },
    
},
{ timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);