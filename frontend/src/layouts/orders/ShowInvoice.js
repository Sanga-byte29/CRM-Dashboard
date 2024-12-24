import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
// import CreateOrder from "./CreateOrder"; // Import your CreateOrder component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ShowInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState({});
  const [showInoviceOrder, setShowInvoiceOrder] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("my request");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch orders and customers from API
  // useEffect(() => {
  //   const fetchOrdersAndCustomers = async () => {
  //     try {
  //       const ordersResponse = await axios.get("http://localhost:8080/orders");
  //       setOrders(ordersResponse.data);

  //       const customersResponse = await axios.get("http://localhost:8080/customers");
  //       const customersMap = customersResponse.data.reduce((map, customer) => {
  //         map[customer._id] = customer;
  //         return map;
  //       }, {});
  //       setCustomers(customersMap);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchOrdersAndCustomers();
  // }, []);

  // Fetch orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/invoices");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchOrders();
  }, []);

  console.log(invoices);

  // Fetch customers (separate useEffect)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/invoices");
        const inovicesMap = response.data.reduce((map, invoice) => {
          map[invoice._id] = customer;
          return map;
        }, {});
        setCustomers(invoicesMap);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  const handleInvoiceOrder = () => {
    setShowCreateInvoice(true);
  };

  const handleRequestChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const invoiceOrders = invoices.filter((invoice) => {
    if (selectedRequest === "all requests") {
      return invoice.invoiceId.toString().includes(searchQuery);
    } else {
      return (
        invoice.invoiceId.toString().includes(searchQuery) && invoice.userId === "your_user_id"
      ); // Replace 'your_user_id' with the actual user ID
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Container style={{ flex: 1, padding: "2rem" }}>
        <Paper elevation={2} style={{ padding: "1.5rem", borderRadius: "8px" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Invoice
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <Button
              component={Link}
              to="/tables/order-form"
              variant="contained"
              style={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
              }}
              onClick={handleCreateOrder}
            >
              Create Order
            </Button> */}
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  displayEmpty
                  value={selectedRequest}
                  onChange={handleRequestChange}
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
                  <MenuItem value="my request">My Invoice</MenuItem>
                  <MenuItem value="all requests">All Invoices</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ m: 1, minWidth: 120, height: "40px" }}
              />
            </div>
          </Box>
          {/* {showCreateOrder && <CreateOrder />} */}
          <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    display: "flex",

                    color: "#333",
                    borderRadius: "8px",
                    display: "flex",
                  }}
                >
                  {/* <TableCell
                  style={{
                    padding: "12px 16px",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  Order ID
                </TableCell> */}

                  <TableCell
                    style={{
                      padding: "12px 16px",
                      flexGrow: 1,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    OrderID
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "12px 16px",
                      flexGrow: 1,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    InvoiceID
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "12px 16px",
                      flexGrow: 1,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Invoice Number
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "12px 16px",
                      flexGrow: 1,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Invoice Date
                  </TableCell>
                  <TableCell
                    style={{
                      padding: "12px 16px",
                      flexGrow: 1,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceOrders.map((invoice) => {
                  // const customer = customers[order.customer] || {};
                  // console.log(customer);
                  //below addition
                  const invoices = invoices[invoice.invoice?._id] || {};
                  return (
                    <TableRow
                      key={invoice._id}
                      style={{
                        borderBottom: "1px solid #e0e0e0",
                        display: "flex",
                      }}
                    >
                      <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {invoice.orderId}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {invoice.invoiceId}
                      </TableCell>

                      {/* <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {customer.contactName || "N/A"}
                      </TableCell> */}
                      <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {invoice.invoiceDate}
                      </TableCell>
                      {/* <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {customer.email || "N/A"}
                      </TableCell> */}
                      {/* <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {customer.contactNumber || "N/A"}
                      </TableCell> */}
                      <TableCell
                        style={{
                          padding: "12px 16px",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {/* <Button
                          variant="outlined"
                          size="small"
                          style={{
                            color: "#1976d2",
                            borderColor: "#1976d2",
                          }}
                          onClick={() => handleAction(order)}
                        >
                          View
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );

  function handleAction(order) {
    console.log("Action clicked for order:", order);
  }
}

export default ShowInvoice;
