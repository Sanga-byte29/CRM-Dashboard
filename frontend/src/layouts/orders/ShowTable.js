import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faCalendarAlt,
  faUser,
  faFileAlt,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ShowTable() {
  const [showOrderManagement, setShowOrderManagement] = useState(false);

  const handleToggleComponent = () => {
    setShowOrderManagement((prev) => !prev);
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          onClick={handleToggleComponent}
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
        >
          {showOrderManagement ? "Back to Dashboard" : "Order Management"}
        </Button>
      </Box>
      {showOrderManagement ? <OrderManagement /> : <Dashboard />}
    </Container>
  );
}

function Dashboard() {
  return (
    <Paper elevation={3} style={{ padding: "2rem" }}>
      <Typography variant="h5">Welcome to the Dashboard</Typography>
      <Typography variant="body1" mt={2}>
        Use the button on the top-right to navigate to the Order Management system.
      </Typography>
    </Paper>
  );
}

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from MongoDB using Axios
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders"); // Replace with your API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "status", headerName: "Order Status", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "quotationNumber", headerName: "Quotation Number", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
          onClick={() => handleAction(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const handleAction = (row) => {
    console.log("Action clicked for row:", row);
  };

  return (
    <Paper elevation={3} style={{ padding: "2rem" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Order Management</Typography>
      </Box>
      <Box style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Paper>
  );
}

export default ShowTable;

/**
 * import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Tables from "./Tables"; // Ensure this is the correct path for the `Tables` component
import { DataGrid } from "@mui/x-data-grid";

// Main App Component
function App() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  // Toggle view between "Order Management" and "Create Order"
  const handleToggleComponent = () => {
    setShowCreateOrder((prev) => !prev);
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">{showCreateOrder ? "Create Order" : "Order Management"}</Typography>
        <Button
          variant="contained"
          onClick={handleToggleComponent}
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
        >
          {showCreateOrder ? "Back to Order Management" : "Create Order"}
        </Button>
      </Box>
      {showCreateOrder ? <Tables /> : <OrderManagement />}
    </Container>
  );
}

// Order Management Component
function OrderManagement() {
  const [orders, setOrders] = useState([
    // Example static data; replace with actual API calls.
    { id: 1, status: "Pending", customerName: "John Doe", quotationNumber: "Q1234", email: "john@example.com", phoneNumber: "1234567890" },
    { id: 2, status: "Completed", customerName: "Jane Smith", quotationNumber: "Q5678", email: "jane@example.com", phoneNumber: "9876543210" },
  ]);

  const columns = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "status", headerName: "Order Status", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "quotationNumber", headerName: "Quotation Number", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
          onClick={() => handleAction(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const handleAction = (row) => {
    console.log("Action clicked for row:", row);
  };

  return (
    <Paper elevation={3} style={{ padding: "2rem" }}>
      <Typography variant="h5" mb={2}>
        Order List
      </Typography>
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Paper>
  );
}

export default App;

 */
