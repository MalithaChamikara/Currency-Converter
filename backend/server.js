const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./utils/dbConfig');
const countryRoutes = require('./modules/country/countryRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());// to parse the incoming requests with JSON payloads

//database connection
dbConfig();

app.use(bodyParser.json());
//routes
app.use('/api/countries', countryRoutes);
const PORT = process.env.PORT || 5000;

//server connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});