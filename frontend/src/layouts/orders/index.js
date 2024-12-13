// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import {
//   Box,
//   Button,
//   Container,
//   InputAdornment,
//   MenuItem,
//   Paper,
//   Select,
//   TextareaAutosize,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faKey, faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";

// // Material Dashboard 2 React components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import CustomerModal from "modals/Modal";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// function Tables() {
//   // State to control modal visibility
//   const [modalOpen, setModalOpen] = useState(false);

//   // Functions to handle modal open/close
//   const handleModalOpen = () => setModalOpen(true);
//   const handleModalClose = () => setModalOpen(false);
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Container style={{ padding: "2rem" }}>
//         <Paper elevation={3} style={{ padding: "2rem" }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//             <Typography variant="h4">Order Management</Typography>
//             <Typography variant="body2" color="textSecondary">
//               <Button
//                 variant="contained"
//                 style={{
//                   backgroundColor: "white", // White background
//                   color: "black", // Black text
//                   border: "1px solid black", // Optional border for clarity
//                   marginLeft: "1rem",
//                 }}
//               >
//                 Create Order
//               </Button>
//             </Typography>
//           </Box>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Order ID"
//                 InputProps={{
//                   readOnly: false, // Ensure it's not readonly
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-key"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Order Date"
//                 InputProps={{
//                   readOnly: false, // Ensure it's not readonly
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-key"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Booked By"
//                 value="Administrator"
//                 InputProps={{
//                   readOnly: true,
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-user"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Order Start Date"
//                 placeholder="dd-mm-yyyy"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-calendar-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Order Completion Date"
//                 placeholder="dd-mm-yyyy"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-calendar-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Payment Due Date"
//                 placeholder="dd-mm-yyyy"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-calendar-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 style={{ height: "24px" }}
//                 label="Project Head"
//                 select
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-user-tie"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               >
//                 <MenuItem value="">
//                   <em>Select Project Head</em>
//                 </MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box display="flex" alignItems="center">
//                 <TextField
//                   label="Select Customer"
//                   select
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <i className="fas fa-users"></i>
//                       </InputAdornment>
//                     ),
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>Select Customer</em>
//                   </MenuItem>
//                 </TextField>
//                 <Button
//                   variant="contained"
//                   style={{
//                     backgroundColor: "white", // White background
//                     color: "black", // Black text
//                     border: "1px solid black", // Optional border for clarity
//                     marginLeft: "1rem",
//                   }}
//                   onClick={handleModalOpen}
//                 >
//                   Add Customer
//                 </Button>
//                 <CustomerModal open={modalOpen} onClose={handleModalClose} />
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Contact Person"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-user"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Mobile Number"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-phone"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Email"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-envelope"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Site/Delivery Address"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-map-marker-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="GST Number"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-file-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Bill To"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-user"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Quotation Number"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-file-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Quotation Date"
//                 placeholder="dd-mm-yyyy"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-calendar-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="PO/PI Number"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-file-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="PO/PI Date"
//                 placeholder="dd-mm-yyyy"
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <i className="fas fa-calendar-alt"></i>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>
//           <Box mt={4}>
//             <Typography variant="h6">As per Quotation/PO/PI Attached</Typography>
//             <Grid container spacing={4} mt={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField label="Transportation" placeholder="₹ 0" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField label="Amount with GST" placeholder="₹ 0" fullWidth />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField label="Total" placeholder="₹ 00000" fullWidth />
//               </Grid>
//             </Grid>
//           </Box>
//           <Box mt={4}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Quotation Attachment"
//                   type="file"
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <i className="fas fa-file-alt"></i>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="PO/PI Attachment"
//                   type="file"
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <i className="fas fa-file-alt"></i>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>
//       </Container>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Tables;

//BELOW IS THE COMPONENT WITH DATE PICKER CALENDER
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Container, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CustomerModal from "modals/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Tables() {
  // State to control modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // States for DatePicker values
  const [orderDate, setOrderDate] = useState(null);
  const [orderStartDate, setOrderStartDate] = useState(null);
  const [orderCompletionDate, setOrderCompletionDate] = useState(null);
  const [paymentDueDate, setPaymentDueDate] = useState(null);
  const [quotationDate, setQuotationDate] = useState(null);
  const [poPiDate, setPoPiDate] = useState(null);

  // Functions to handle modal open/close
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container style={{ padding: "2rem" }}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4">Order Management</Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white", // White background
                color: "black", // Black text
                border: "1px solid black", // Optional border for clarity
              }}
            >
              Create Order
            </Button>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Order ID"
                  InputProps={{
                    readOnly: false, // Ensure it's not readonly
                  }}
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
                  value="Administrator"
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
                <TextField label="Project Head" select fullWidth>
                  <MenuItem value="">
                    <em>Select Project Head</em>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center">
                  <TextField label="Select Customer" select fullWidth>
                    <MenuItem value="">
                      <em>Select Customer</em>
                    </MenuItem>
                  </TextField>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white", // White background
                      color: "black", // Black text
                      border: "1px solid black", // Optional border for clarity
                      marginLeft: "1rem",
                    }}
                    onClick={handleModalOpen}
                  >
                    Add Customer
                  </Button>
                  <CustomerModal open={modalOpen} onClose={handleModalClose} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Contact Person" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Mobile Number" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Site/Delivery Address" multiline rows={4} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="GST Number" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Bill To" multiline rows={4} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Quotation Number" fullWidth />
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
                <TextField label="PO/PI Number" fullWidth />
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
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
