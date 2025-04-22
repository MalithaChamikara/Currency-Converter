const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dbConfig = require('./utils/dbConfig');
const countryRoutes = require('./modules/country/countryRoutes');
const transactionRoutes = require('./modules/transaction/transactionRoutes');

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());// to parse the incoming requests with JSON payloads

//database connection
dbConfig();

app.use(bodyParser.json());
//routes
app.use('/api/countries', countryRoutes);
app.use('/api/transactions', transactionRoutes);

//serve static frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
const PORT = process.env.PORT || 5000;

//server connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});