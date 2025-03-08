const mongoose = require('mongoose');
const Transaction = require('../../models/transactionModel');
const Country = require('../../models/countryModel');
const axios = require('axios');


const EXCHANGE_API_URL = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest`;

// Get all transactions
// GET /api/transactions
const getAllTransactions = async () => {
    try {
        //fetch all transactions from the database
        const transactions = await Transaction.find();
        return transactions;
    } catch (error) {
        console.error('Error in getting transactions', error.message);
        throw error;
    }
}

// Get transaction by ID
// GET /api/transactions/:id
const getTransactionById = async (id) => {
    try {
        //fetch transaction by ID from the database
        const transaction = await Transaction.findById(id);
        return transaction;
    } catch (error) {
        console.error('Error in getting transaction by ID', error.message);
        throw error;
    }
}

// Create a new transaction
// POST /api/transactions
const createTransaction = async (transactionData) => {
    try {
        console.log(transactionData);
        const fromCountry = transactionData.fromCountry;
        const toCountry = transactionData.toCountry;
        const amount = parseFloat(transactionData.transferAmount);
        
        
        //fetch exchange rate from the exchange rate API
        const response = await axios.get(`${EXCHANGE_API_URL}/${fromCountry}`);
        if (!response) {
            throw new Error('Error in fetching exchange rate');
          }
        const exchangeRate = response.data.conversion_rates[toCountry];
        if(!exchangeRate){
            throw new Error('Invalid toCountryCurrencyCode or exchange rate not available');
        }
        //calculate the converted amount
        const convertedAmount = amount * exchangeRate; 
        transactionData.convertedAmount = convertedAmount;
        transactionData.exchangeRate = exchangeRate;
        
        //create a new transaction
        const transaction = new Transaction(transactionData);
        //save the transaction to the database
        await transaction.save();
        return transaction;
    } catch (error) {
        console.error('Error in creating transaction', error.message);
        throw error;
    }
}

// Update a transaction by ID
// PUT /api/transactions/:id
const updateTransaction = async (id, transactionData) => {
    try {
        //update transaction by ID
        const transaction = await Transaction.findByIdAndUpdate(id, transactionData, { new: true });
        return transaction;
    } catch (error) {
        console.error('Error in updating transaction', error.message);
        throw error;
    }
}

// Delete a transaction by ID
// DELETE /api/transactions/:id
const deleteTransaction = async (id) => {
    try {
        //delete transaction by ID
        await Transaction.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error in deleting transaction', error.message);
        throw error;
    }
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
}