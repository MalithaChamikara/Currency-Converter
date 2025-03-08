const transactionService = require('./transactionService');

// Get all transactions
// GET /api/transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        console.error('Error in getting transactions', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Get transaction by ID
// GET /api/transactions/:id
const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await transactionService.getTransactionById(transactionId);
        res.json(transaction);
    }
    catch (error) {
        console.error('Error in getting transaction by ID', error.message);
        res.status(500).json({ message: error.message });
    }  
}

// 
// Create a new transaction
// POST /api/transactions
const createTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const transaction = await transactionService.createTransaction(transactionData);
        res.json(transaction);
    } catch (error) {
        console.error('Error in creating transaction', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Update a transaction by ID
// PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transactionData = req.body;
        const transaction = await transactionService.updateTransaction(transactionId, transactionData);
        res.json(transaction);
    } catch (error) {
        console.error('Error in updating transaction', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Delete a transaction by ID
// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        await transactionService.deleteTransaction(transactionId);
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error in deleting transaction', error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
}