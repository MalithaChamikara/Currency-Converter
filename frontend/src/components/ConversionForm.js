import React, { useEffect, useState } from "react";
import { Container, Select, TextField, MenuItem, Button, Typography, Paper, InputLabel, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { EXCHANGE_API_URL, BASE_API } from "../utils/apiConfig";



const ConversionForm = ({ fetchTransactions, countries }) => {
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTransferLoading, setIsTransferLoading] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleConvert = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get(`${EXCHANGE_API_URL}${fromCurrency}`);
            if (!response) {
                throw new Error("Error in fetching exchange rate");
            }
            const exchangeRate = response.data.conversion_rates[toCurrency];
            if (!exchangeRate) {
                throw new Error("Invalid toCountryCurrencyCode or exchange rate not available");
            }
            setExchangeRate(exchangeRate);
            const convertedAmount = amount * exchangeRate;
            setConvertedAmount(convertedAmount);
            setIsLoading(false);
        } catch (error) {
            console.error("Error converting amount: ", error);
            showSnackbar("Error converting amount", "error");
            setIsLoading(false)
        }

    };

    const handleTransfer = async (event) => {
        event.preventDefault();
        setIsTransferLoading(true);
        const transactionData = {
            fromCountry: fromCurrency,
            toCountry: toCurrency,
            transferAmount: amount,
            convertedAmount: convertedAmount,
            exchangeRate: exchangeRate,

        }
        try {
            const response = await axios.post(`${BASE_API}/transactions`, transactionData);
            console.log("Transfer response: ", response.data);
            setFromCurrency("");
            setToCurrency("");
            setConvertedAmount(null);
            setAmount("");
            fetchTransactions();
            showSnackbar("Transaction saved successfully!", "success");
            setIsTransferLoading(false);
        } catch (error) {
            console.error("Error transferring amount: ", error);
            showSnackbar("Error saving transaction", "error");
            setIsTransferLoading(false);
        }
    }
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


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

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConvert}
                    style={{ marginTop: "10px" }}
                    disabled={isLoading}
                >
                    {isLoading ? "Converting..." : "Convert"}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTransfer}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    disabled={!convertedAmount}
                >
                    {isTransferLoading ? "Transferring..." : "Transfer"}
                </Button>
            </Paper>
            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};


export default ConversionForm;

