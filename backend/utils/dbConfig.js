const mongoose  = require('mongoose');
require('dotenv').config();

//establishing connection with the database
const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL',error.message);
        process.exit(1);
    }
}

module.exports = dbConfig;
