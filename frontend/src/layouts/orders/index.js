import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Container, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

function Tables() {
  // States for all input fields
  const [orderDate, setOrderDate] = useState(null);
  const [orderStartDate, setOrderStartDate] = useState(null);
  const [orderCompletionDate, setOrderCompletionDate] = useState(null);
  const [paymentDueDate, setPaymentDueDate] = useState(null);
  const [quotationDate, setQuotationDate] = useState(null);
  const [poPiDate, setPoPiDate] = useState(null);
  const [formData, setFormData] = useState({
    orderId: "",
    bookedBy: "Administrator",
    projectHead: "",
    customer: "",
    contactPerson: "",
    mobileNumber: "",
    email: "",
    deliveryAddress: "",
    gstNumber: "",
    billTo: "",
    quotationNumber: "",
    poPiNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        orderDate: orderDate ? orderDate.format("YYYY-MM-DD") : null,
        orderStartDate: orderStartDate ? orderStartDate.format("YYYY-MM-DD") : null,
        orderCompletionDate: orderCompletionDate ? orderCompletionDate.format("YYYY-MM-DD") : null,
        paymentDueDate: paymentDueDate ? paymentDueDate.format("YYYY-MM-DD") : null,
        quotationDate: quotationDate ? quotationDate.format("YYYY-MM-DD") : null,
        poPiDate: poPiDate ? poPiDate.format("YYYY-MM-DD") : null,
      };

      const response = await axios.post("http://localhost:8080/orders", formattedData);
      alert("Order created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create the order.");
    }
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Order Management</Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}
            onClick={handleSubmit}
          >
            Submit Order
          </Button>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Order ID"
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Order Date"
                value={orderDate}
                onChange={(newValue) => setOrderDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Booked By"
                name="bookedBy"
                value={formData.bookedBy}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Order Start Date"
                value={orderStartDate}
                onChange={(newValue) => setOrderStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Order Completion Date"
                value={orderCompletionDate}
                onChange={(newValue) => setOrderCompletionDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Payment Due Date"
                value={paymentDueDate}
                onChange={(newValue) => setPaymentDueDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Project Head"
                name="projectHead"
                value={formData.projectHead}
                onChange={handleInputChange}
                select
                fullWidth
              >
                <MenuItem value="">
                  <em>Select Project Head</em>
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Site/Delivery Address"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="GST Number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bill To"
                name="billTo"
                value={formData.billTo}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Quotation Number"
                name="quotationNumber"
                value={formData.quotationNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Quotation Date"
                value={quotationDate}
                onChange={(newValue) => setQuotationDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="PO/PI Number"
                name="poPiNumber"
                value={formData.poPiNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="PO/PI Date"
                value={poPiDate}
                onChange={(newValue) => setPoPiDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Paper>
    </Container>
  );
}

export default Tables;
