import React,{useState,useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";

const TransferHistory = ({transactions,fetchTransactions}) => {

    // handle revoke transaction
    const handleRevoke = async (transactionId,event) => {
        event.preventDefault();
        try {
            await axios.delete(`http://localhost:5000/api/transactions/${transactionId}`);
            fetchTransactions();
        }catch (error) {
            console.error("Error revoking transaction: ", error);
        }
    }
    return (
        <TableContainer component={Paper} sx={{
            marginTop: "20px",
            background: "linear-gradient(to right, #ffffff, #f2f3f7)", // Professional background
            borderRadius: "10px",
            padding: "15px",
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Converted Amount</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction._id}>
                            <TableCell>{transaction.fromCountry}</TableCell>
                            <TableCell>{transaction.toCountry}</TableCell>
                            <TableCell>{transaction.transferAmount}</TableCell>
                            <TableCell>{transaction.convertedAmount}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={(event) => handleRevoke(transaction._id)}>
                                    Revoke
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransferHistory;
