import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { BASE_API } from "../utils/apiConfig";

const TransferHistory = ({ transactions, fetchTransactions }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // handle revoke transaction
    const handleRevoke = async (transactionId) => {
        try {
            await axios.delete(`${BASE_API}/transactions/${transactionId}`);
            fetchTransactions();
            showSnackbar("Transaction successfully revoked!", "success");
        } catch (error) {
            console.error("Error revoking transaction: ", error);
            showSnackbar("Failed to revoke transaction!", "error");
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
        <>

            <TableContainer component={Paper} sx={{
                marginTop: "20px",
                background: "linear-gradient(to right, #ffffff, #f2f3f7)",
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
                                <TableCell>{transaction.transferAmount} {transaction.fromCountry}</TableCell>
                                <TableCell>{transaction.convertedAmount} {transaction.toCountry}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleRevoke(transaction._id)}>
                                        Revoke
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
        </>
    );
};

export default TransferHistory;
