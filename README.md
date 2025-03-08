Currency Converter App  

A simple currency converter application that allows users to convert currencies between USD, LKR, AUD, and INR, and tracks transaction history.

---

1.Technologies Used
###Frontend
- ⚛️ React.js
- 🎨 Material UI (for UI styling)
- 🌐 Axios (for API requests)

###Backend
- 🖥️ Node.js
- 🚀 Express.js (for API handling)
- 📦 Mongoose (for MongoDB integration)
- 🔐 dotenv (for environment variables)
- 🌍 Axios (for fetching exchange rates)

###Database:
- 🛢 MongoDB Atlas (for storing transaction history)

###External APIs:
- 💱 ExchangeRate-API (for real-time currency conversion)

---

2.📂 Project Structure:
The Project follows the mvc architecture(Model-View-Controller).
📂 backend:
models/ # Database models (Mongoose schemas) │ ├── countryModel.js # Country schema │ ├── transactionModel.js # Transaction schema 
modules/ # Business logic modules │ ├── country/ # Country-related functionalities │ │ ├── countryController.js # Handles country-related API requests │ │ ├── countryRoutes.js # Defines country-related API routes │ │ ├── countryService.js # Country business logic (service layer) │ │ │ 
transaction/ # Transaction-related functionalities │ │ ├── transactionController.js # Handles transaction API requests │ │ ├── transactionRoutes.js # Defines transaction-related API routes │ │ ├── transactionService.js # Transaction business logic (service layer) │ 
utils/ # Utility functions and configurations │ ├── dbConfig.js # Database connection setup │ 
.env # Environment variables (not tracked by Git) 
package.json # Project dependencies 
package-lock.json # Dependency lock file │── server.js # Main backend server

📂 frontend:
components/ # React components │ │ ├── ConversionForm.js # Currency conversion form UI │ │ ├── TransferHistory.js # Displays transaction history  
utils/ # Utility functions and API config │ │ ├── apiConfig.js # API base URL and axios setup │ │ │ 
App.js # Main app component │

3.##🔧 Setup & Run Instructions:

3.1 Clone the Repository
    git clone https://github.com/your-username/currency-converter.git

3.2 Go to the directory currency-converter
    cd currency-converter

3.3 Setup the backend
    3.3.1 Go to backend directory(cd backend)
    3.3.2 Open the terminal and run 'npm install'

3.4 Create a .env file
    3.4.1 Inside backend/.env,add
        MONGODB_URI=mongodb_connection_string
        EXCHANGE_API_KEY=exchange_rate_api_key
        PORT=5000

3.5 Start the  backend server with the command 'npm start' and now backend server will run on http://localhost:5000

3.6 Setup the frontend
     3.6.1 Go to frontend directory(cd frontend)
     3.6.2 Open the terminal and run 'npm install'

3.7 start the react app with the command 'npm start' and now frontend should run on http://localhost:3000