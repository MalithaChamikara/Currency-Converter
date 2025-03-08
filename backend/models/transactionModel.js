const e = require('express');
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromCountry:{
        type:String,
        required:true
    },
    toCountry:{
        type:String,
        required:true
    },
    transferAmount:{
        type:Number,
        required:true
    },
    convertedAmount:{
        type:Number,
        required:true
    },
    exchangeRate:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Transaction',transactionSchema);