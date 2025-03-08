const countryService = require('./countryService');
// Get all countries
// GET /api/countries
const getAllCountries = async (req, res) => {
    try {
        const countries = await countryService.getAllCountries();
        res.json(countries);
    } catch (error) {
        console.error('Error in getting countries', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Get country by ID
// GET /api/countries/:id
const getCountryById = async (req, res) => {
    try {
        const countryId = req.params.id;
        const country = await countryService.getCountryById(countryId);
        res.json(country);
    } catch (error) {
        console.error('Error in getting country by ID', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Create a new country
// POST /api/countries
const createCountry = async (req, res) => {
    try {
        console.log(req.body);
        
        const countryData = req.body;
        const country = await countryService.createCountry(countryData);
        res.json(country);
    } catch (error) {
        console.error('Error in creating country', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Update a country by ID
// PUT /api/countries/:id
const updateCountry = async (req, res) => {
    try {
        const countryId = req.params.id;
        const countryData = req.body;
        const country = await countryService.updateCountry(countryId, countryData);
        res.json(country);
    } catch (error) {
        console.error('Error in updating country', error.message);
        res.status(500).json({ message: error.message });
    }
}

// Delete a country by ID
// DELETE /api/countries/:id
const deleteCountry = async (req, res) => {
    try {
        const countryId = req.params.id;
        await countryService.deleteCountry(countryId);
        res.json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('Error in deleting country', error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry
}