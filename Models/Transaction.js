const mongoose = require('mongoose');
const { applyTimestamps } = require('./Customer');

const transactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    type: {
        type: String,
        enum: ['intra', 'inter'],
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    recipientAccountNumber: {
        type: String,
        require: true
    },
    recipientBankCode: {
        type: String
    },
    reference: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'seccessful', 'failed'],
        default: 'pending'
    },
},
{ timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);