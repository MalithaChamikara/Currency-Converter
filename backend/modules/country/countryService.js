const mongoose = require('mongoose');
const Country  = require('../../models/countryModel');

//Get all countries
//GET /api/countries
const getAllCountries = async () => {
    try {
        const countries = await Country.find();
        return countries;
    }catch (error) {
        console.error('Error in getting countries', error.message);
        throw error;
    }
}

//Get country by ID
//GET /api/countries/:id
const getCountryById = async (id) => {
    try {
        const country = await Country.findById(id);
        return country;
    } catch (error) {
        console.error('Error in getting country by ID', error.message);
        throw error;
    }
}

//Create a new country
//POST /api/countries
const createCountry = async (countryData) => {
    try {
        const country = new Country(countryData);
        await country.save();
        return country;
    } catch (error) {
        console.error('Error in creating country', error.message);
        throw error;
    }
}

//Update a country by ID
//PUT /api/countries/:id
const updateCountry = async (id, countryData) => {
    try {
        const country = await Country.findByIdAndUpdate(id, countryData, { new: true });
        return country;
    }
    catch (error) {
        console.error('Error in updating country', error.message);
        throw error;
    }
}

//Delete a country by ID
//DELETE /api/countries/:id
const deleteCountry = async (id) => {
    try {
        await Country.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error in deleting country', error.message);
        throw error;
    }
}

module.exports = {
    getAllCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry
}