import React, { useState,useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ConversionForm from "./components/ConversionForm";
import TransferHistory from "./components/TransferHistory";
import axios from "axios";
import { BASE_API } from "./utils/apiConfig";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountriesWithCurrencyCode();
  }, []);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchCountriesWithCurrencyCode = async () => {
    try {
        const response = await axios.get(`${BASE_API}/countries`);
        setCountries(response.data);
        console.log("Countries with currency code: ", response.data);

    } catch (error) {
        console.error("Error fetching countries with currency code: ", error);
    }
}

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_API}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
        Currency Transfer App
      </Typography>
      <ConversionForm fetchTransactions={fetchTransactions}  countries={countries}/>
      <TransferHistory  transactions={transactions} fetchTransactions={fetchTransactions} countries={countries}/>
    </Container>
  );
};

export default App;
