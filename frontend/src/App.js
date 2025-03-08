import React, { useState,useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ConversionForm from "./components/ConversionForm";
import TransferHistory from "./components/TransferHistory";
import axios from "axios";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
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
      <ConversionForm fetchTransactions={fetchTransactions} />
      <TransferHistory  transactions={transactions} fetchTransactions={fetchTransactions}/>
    </Container>
  );
};

export default App;
