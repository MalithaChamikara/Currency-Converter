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
        //fetch the currencyUnit of the fromCountry
        const fromCountryData = await Country.findOne({ name: fromCountry });
        if (!fromCountryData) {
            console.log('Invalid fromCountry');
            throw new Error('Country not found');
        }
        const fromCountryCurrencyCode = fromCountryData.currencyUnit;
        const toCountry = transactionData.toCountry;
        //fetch the currencyUnit of the toCountry
        const toCountryData = await Country.findOne({ name: toCountry });
        if (!toCountryData) {
            console.log('Invalid toCountry');
            throw new Error('Country not found');
        }
        const toCountryCurrencyCode = toCountryData.currencyUnit;
        const amount = transactionData.transferAmount;
        
        
        //fetch exchange rate from the exchange rate API
        const response = await axios.get(`${EXCHANGE_API_URL}/${fromCountryCurrencyCode}`);
        if (!response) {
            throw new Error('Error in fetching exchange rate');
          }
        const exchangeRate = response.data.conversion_rates[toCountryCurrencyCode];
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