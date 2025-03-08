const express = require('express');
const router = express.Router();
const transactionController = require('./transactionController');

// Get all transactions
// GET /api/transactions
router.get('/', transactionController.getAllTransactions);

// Get transaction by ID
// GET /api/transactions/:id
router.get('/:id', transactionController.getTransactionById);

// Create a new transaction
// POST /api/transactions
router.post('/', transactionController.createTransaction);

// Update a transaction by ID
// PUT /api/transactions/:id
router.put('/:id', transactionController.updateTransaction);

// Delete a transaction by ID
// DELETE /api/transactions/:id
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;