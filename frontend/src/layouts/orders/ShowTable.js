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

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("my request");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/orders"); // Replace with your API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleCreateOrder = () => {
    setShowCreateOrder(true);
  };

  const handleRequestChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedRequest === "all requests") {
      return order.orderId.toString().includes(searchQuery);
    } else {
      return order.orderId.toString().includes(searchQuery) && order.userId === "your_user_id"; // Replace 'your_user_id' with the actual user ID
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Left side content (if any) */}
      <div style={{ width: "50px", backgroundColor: "#f0f0f0" }}>
        {/* Your left side content here */}
      </div>
      <Container style={{ flex: 1, padding: "2rem" }}>
        <Paper elevation={2} style={{ padding: "1.5rem", borderRadius: "8px" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Order Management
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
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
              </Button>
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
                      height: "40px !important", // Enforce height using !important
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSelect-select": {
                      padding: "0 10px", // Add padding for consistency
                      height: "40px !important", // Enforce height using !important
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                >
                  <MenuItem value="my request">My Request</MenuItem>
                  <MenuItem value="all requests">All Requests</MenuItem>
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
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    borderRadius: "8px",
                    display: "flex",
                  }}
                >
                  <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                    Order ID
                  </TableCell>

                  <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                    Customer Name
                  </TableCell>
                  <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                    Quotation Number
                  </TableCell>
                  <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                    Phone Number
                  </TableCell>
                  <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    style={{ borderBottom: "1px solid #e0e0e0", display: "flex" }}
                  >
                    <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                      {order.orderId}
                    </TableCell>

                    <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                      {order.customer}
                    </TableCell>
                    <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                      {order.quotationNumber}
                    </TableCell>
                    <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                      {order.email}
                    </TableCell>
                    <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                      {order.mobileNumber}
                    </TableCell>
                    <TableCell style={{ padding: "12px 16px", flexGrow: 1, textAlign: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ color: "#1976d2", borderColor: "#1976d2" }}
                        onClick={() => handleAction(order)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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

export default OrderManagement;
