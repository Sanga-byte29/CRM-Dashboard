import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs"; //ADDITION
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomerModal from "modals/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InvoiceForm from "./forms/InvoiceForm";
import LogistcsForm from "./forms/LogisticsForm";
import LogisticsForm from "./forms/LogisticsForm";
import PaymentForm from "./forms/PaymentForm";

function Tables() {
  // States for all input fields
  const [productForms, setProductForms] = useState([
    {
      id: 1,
      productType: "",
      productName: "",
      machineName: "",
      packagingDate: "",
      quantity: "",
      unit: "",
      lotNumber: "",
      sku: "",
      qualityInCharge: "",
      packagingInCharge: "",
      operatorName: "",
      shift: "",
      comment: "",
    },
  ]);

  const handleAddForm = () => {
    setProductForms([...productForms, { id: Date.now() }]);
  };

  const handleRemoveForm = (id) => {
    setProductForms(productForms.filter((form) => form.id !== id));
  };
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(dayjs());
  const [orderStartDate, setOrderStartDate] = useState(null);
  const [orderCompletionDate, setOrderCompletionDate] = useState(null);
  const [paymentDueDate, setPaymentDueDate] = useState(null);
  const [quotationDate, setQuotationDate] = useState(null);
  const [poPiDate, setPoPiDate] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [materialDispatchDate, setMaterialDispatchDate] = useState(null);
  const [customers, setCustomers] = useState([]); // Initialize as an empty array

  const [formData, setFormData] = useState({
    bookedBy: "Administrator",
    projectHead: "",
    contactPerson: "",
    mobileNumber: "",
    email: "",
    deliveryAddress: "",
    gstNumber: "",
    billTo: "",
    quotationNumber: "",
    poPiNumber: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  // Functions to handle modal open/close
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
        const response = await axios.get("http://localhost:8080/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  //below is for customer selection
  const handleCustomerChange = (event, newValue) => {
    if (newValue) {
      const selected = customers.find((customer) => customer.contactName === newValue.contactName);
      if (selected) {
        setSelectedCustomer(selected);
        setFormData((prev) => ({
          ...prev,
          contactPerson: selected.contactName,
          mobileNumber: selected.contactNumber,
          email: selected.email,
          deliveryAddress: selected.siteDeliveryAddress,
          gstNumber: selected.gstNumber,
        }));
      }
    } else {
      setSelectedCustomer(null);
      setFormData((prev) => ({
        ...prev,
        contactPerson: "",
        mobileNumber: "",
        email: "",
        deliveryAddress: "",
        gstNumber: "",
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
        //below new add
        customer: selectedCustomer?._id || "", // Send customer ID
        orderDate: orderDate.toISOString().split("T")[0],
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
    <DashboardLayout>
      <DashboardNavbar />
      <Container style={{ padding: "2rem" }}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4">Order Management</Typography>
            {/* y */}
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Order ID"
                  name="orderId"
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
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
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
                        },
                      }}
                    />
                  )}
                  style={{ flexGrow: 1 }} // Allow the Autocomplete to take available space
                />
                <Button
                  variant="contained"
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "white",
                    height: "47px", // Match the height of the Autocomplete
                    padding: "0 15px",
                    fontSize: "12px",
                  }}
                  onClick={handleModalOpen}
                >
                  Add Customer
                </Button>
                <CustomerModal open={modalOpen} onClose={handleModalClose} />
              </Grid>

              <Grid item xs={12} md={4}></Grid>
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
              <Grid item xs={12} md={4}>
                <TextField
                  label="Invoice Number"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Invoice Date"
                  value={invoiceDate}
                  onChange={(newValue) => setInvoiceDate(newValue)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Grid
            container
            spacing={3}
            style={{ position: "relative", top: "10px", marginBottom: "20px" }}
          >
            {/* Product Details Section */}
            <Grid item xs={12} md={12}>
              {/* Header Section */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={2}>
                <Typography variant="h5" fontWeight="bold">
                  Product Details
                </Typography>
                <Button
                  onClick={handleAddForm}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "black",
                    width: "200px",
                    height: "47px",
                    padding: "0 15px",
                    fontSize: "13px",
                    position: "relative",
                    left: "25px",
                  }}
                >
                  + Add Product Details
                </Button>
              </Box>

              {/* Form Section */}
              {productForms.length > 0 &&
                productForms.map((form, index) => (
                  <Box
                    key={form.id}
                    mb={4}
                    border="1px solid #e0e0e0"
                    borderRadius="8px"
                    p={3}
                    mx={2}
                    bgcolor="#f9f9f9"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Product Type"
                          fullWidth
                          select
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
                          <MenuItem value="type1">Type 1</MenuItem>
                          <MenuItem value="type2">Type 2</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Product Name" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Machine Name and Number" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Packaging/Manufacturing Date"
                          fullWidth
                          type="date"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField label="Quantity" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField label="Unit" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Lot No/Batch No" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Start Time"
                          fullWidth
                          type="time"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="End Time"
                          fullWidth
                          type="time"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField label="SKU/Variant" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Quality In-Charge" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Packaging/Processing In-Charge" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Operator Name" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Shift" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Comments" fullWidth multiline rows={2} />
                      </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button
                        variant="contained"
                        style={{
                          display: "flex-start",
                          background: "linear-gradient(to right, #6a11cb, #2575fc)",
                          color: "#fff",
                          textTransform: "none",
                          padding: "8px 24px",
                        }}
                      >
                        Save
                      </Button>
                      <IconButton onClick={() => handleRemoveForm(form.id)} color="error">
                        <RemoveCircleIcon />
                      </IconButton>
                      <IconButton onClick={() => handleAddForm(form.id)} color="error">
                        <AddCircleIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
            </Grid>
            {/* invoice */}
            <InvoiceForm />
            {/* logistics  */}
            <LogisticsForm />

            {/* payments */}
            <PaymentForm />

            {/* save and submit */}
            <Grid container spacing={2} style={{ padding: "20px" }}>
              <Box mt={4} ml={3}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Quotation Attachment"
                      type="file"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fas fa-file-alt"></i>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="PO/PI Attachment"
                      type="file"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fas fa-file-alt"></i>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Cancel CAPA Plan */}

              {/* Save and Submit Buttons */}
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "16px",
                }}
              >
                <Grid item xs={12}>
                  <Button variant="body1">Cancel Order</Button>
                </Grid>
                <Button
                  variant="contained"
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "#fff",
                    textTransform: "none",
                    padding: "8px 24px",
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "#fff",
                    textTransform: "none",
                    padding: "8px 24px",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}

export default Tables;
