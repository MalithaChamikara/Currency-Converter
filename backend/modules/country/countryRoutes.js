const express = require('express');
const router = express.Router();
const countryController = require('./countryController');

// Get all countries
// GET /api/countries
router.get('/', countryController.getAllCountries);

// Get country by ID
// GET /api/countries/:id
router.get('/:id', countryController.getCountryById);

// Create a new country
// POST /api/countries
router.post('/', countryController.createCountry);

// Update a country by ID
// PUT /api/countries/:id
router.put('/:id', countryController.updateCountry);

// Delete a country by ID
// DELETE /api/countries/:id
router.delete('/:id', countryController.deleteCountry);

module.exports = router;