import React, { useEffect, useState } from "react";
import { Container, Select, TextField, MenuItem, Button, Typography, Paper, InputLabel } from "@mui/material";
import axios from "axios";
import BASE_API from "../utils/apiConfig";


const ConversionForm = ({fetchTransactions}) => {
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCountriesWithCurrencyCode();
    }, []);

    const fetchCountriesWithCurrencyCode = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/countries');
            setCountries(response.data);
            console.log("Countries with currency code: ", response.data);

        } catch (error) {
            console.error("Error fetching countries with currency code: ", error);
        }
    }

    const handleConvert = async () => {
        // Simulated conversion (Replace with API call)

    };

    const handleTransfer = async (event) => {
        event.preventDefault();
        const transactionData = {
            fromCountry: fromCurrency,
            toCountry: toCurrency,
            transferAmount: amount,

        }
        try {
            const response = await axios.post('http://localhost:5000/api/transactions', transactionData);
            console.log("Transfer response: ", response.data);
            setFromCurrency("");
            setToCurrency("");
            setConvertedAmount(null);
            setAmount("");
            fetchTransactions();
        } catch (error) {
            console.error("Error transferring amount: ", error);
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{
                padding: "25px",
                marginTop: "20px",
                background: "linear-gradient(to right, #f4f7f8, #eef1f5)",
                borderRadius: "10px",
            }}>
                <Typography variant="h5" gutterBottom>
                    Currency Converter
                </Typography>
                <InputLabel>From Country</InputLabel>
                <Select
                    aria-placeholder="From Country"
                    fullWidth
                    label="From Country"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <MenuItem value="" disabled >
                        Select a currency
                    </MenuItem>
                    {countries.map((country) => (
                        <MenuItem key={country.id} value={country.currencyUnit}>
                            {country.name} ({country.currencyUnit})
                        </MenuItem>
                    ))}
                </Select>

                <InputLabel>To Country</InputLabel>
                <Select
                    aria-placeholder="To Country"
                    fullWidth
                    label="To Country"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    <MenuItem value="" disabled >
                        Select a currency
                    </MenuItem>
                    {countries.map((country) => (
                        <MenuItem key={country.id} value={country.currencyUnit}>
                            {country.name} ({country.currencyUnit})
                        </MenuItem>
                    ))}
                </Select>


                <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                />

                {convertedAmount !== null && (
                    <Typography variant="h6" color="primary">
                        Converted Amount: {convertedAmount}
                    </Typography>
                )}

                {/* <Button variant="contained" color="primary" onClick={handleConvert} style={{ marginTop: "10px" }}>
                    Convert
                </Button> */}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTransfer}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    // disabled={!convertedAmount}
                >
                    Transfer
                </Button>
            </Paper>
        </Container>
    );
};


export default ConversionForm;

