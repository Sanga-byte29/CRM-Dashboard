import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Container, MenuItem, Paper, TextField, Typography } from "@mui/material";
import dayjs from "dayjs"; //ADDITION
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

function Tables() {
  // States for all input fields
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(dayjs());
  //focus above
  // const [orderDate, setOrderDate] = useState(null);
  const [orderStartDate, setOrderStartDate] = useState(null);
  const [orderCompletionDate, setOrderCompletionDate] = useState(null);
  const [paymentDueDate, setPaymentDueDate] = useState(null);
  const [quotationDate, setQuotationDate] = useState(null);
  const [poPiDate, setPoPiDate] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setCustomers] = useState([]); // Initialize as an empty array

  const [formData, setFormData] = useState({
    //newlines watchout

    // orderId: "",
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

  //below is for automated orderid generator
  useEffect(() => {
    const generateOrderId = () => {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      return `ORD-${timestamp}-${randomNum}`;
    };

    setOrderId(generateOrderId());
  }, []);

  //below is to fetch all the customersss
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/orders/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  //below is for customer selection
  const handleCustomerChange = (e) => {
    const customerName = e.target.value;
    setSelectedCustomer(customerName);

    const customerData = customers.find((c) => c.customer === customerName);
    if (customerData) {
      setFormData((prev) => ({
        ...prev,
        ...customerData,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        orderId,
        orderDate: orderDate.toISOString().split("T")[0],
        // ...formData,
        // orderDate: orderDate ? orderDate.format("YYYY-MM-DD") : null,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
        completionDate: completionDate ? completionDate.format("YYYY-MM-DD") : null,
        paymentDueDate: paymentDueDate ? paymentDueDate.format("YYYY-MM-DD") : null,
        quotationDate: quotationDate ? quotationDate.format("YYYY-MM-DD") : null,
        poDate: poPiDate ? poPiDate.format("YYYY-MM-DD") : null,
        ...formData,
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
            // style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}
            style={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            Submit Order
          </Button>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Order ID"
                name="orderId"
                // value={formData.orderId}
                // onChange={handleInputChange}
                disabled
                value={orderId}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Order Date"
                value={orderDate}
                disabled
                // onChange={(newValue) => setOrderDate(newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Booked By"
                name="bookedBy"
                disabled
                value={formData.bookedBy}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Order Start Date"
                value={orderStartDate}
                onChange={(newValue) => setOrderStartDate(newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Order Completion Date"
                value={orderCompletionDate}
                onChange={(newValue) => setOrderCompletionDate(newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Payment Due Date"
                value={paymentDueDate}
                onChange={(newValue) => setPaymentDueDate(newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                // displayEmpty
                label="Project Head"
                name="projectHead"
                value={formData.projectHead}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {},
                    height: "40px !important",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiSelect-select": {
                    padding: "0 10px",
                    height: "40px !important",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                select
                fullWidth
              >
                <MenuItem value="">
                  <em>Select Project Head</em>
                </MenuItem>
              </TextField>
            </Grid>
            {/* below previous */}
            {/* <Grid item xs={12} md={4}>
              <TextField
                label="Customer"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid> */}
            {/* now updated for customer selection */}
            {/* stage 2 */}
            {/* <Grid item xs={12} md={4}>
              <TextField
                label="Customer"
                select
                name="customer"
                value={selectedCustomer}
                onChange={handleCustomerChange}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                    },
                    height: "40px !important",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiSelect-select": {
                    padding: "0 10px",
                    height: "40px !important",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select a Customer</em>
                </MenuItem>
                {customers.map((customer, index) => (
                  <MenuItem key={index} value={customer.customer}>
                    {customer.customer}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            {/* stage 3 */}
            <Grid item xs={12} md={4}>
              <Autocomplete
                freeSolo
                options={customers.map((customer) => customer.customer)} // Existing customer list
                value={selectedCustomer} // Selected value
                onInputChange={(event, newValue) => {
                  setSelectedCustomer(newValue); // Update the selected customer
                  setFormData((prev) => ({
                    ...prev,
                    customer: newValue,
                  }));

                  // Find if the entered value matches any existing customer to autofill details
                  const existingCustomer = customers.find((c) => c.customer === newValue);
                  if (existingCustomer) {
                    setFormData((prev) => ({
                      ...prev,
                      ...existingCustomer, // Autofill details
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "47px !important",
                        "& .MuiOutlinedInput-notchedOutline": {
                          height: "47px !important",
                        },
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <TextField
                label="GST Number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <TextField
                label="Quotation Number"
                name="quotationNumber"
                value={formData.quotationNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Quotation Date"
                value={quotationDate}
                onChange={(newValue) => setQuotationDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="PO/PI Number"
                name="poPiNumber"
                value={formData.poPiNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="PO/PI Date"
                value={poPiDate}
                onChange={(newValue) => setPoPiDate(newValue)}
                sx={{ width: "100%" }}
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
