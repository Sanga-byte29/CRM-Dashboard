import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CustomerModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    contactName: "",
    contactNumber: "",
    siteNo: "",
    gstNo: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (onSubmit) {
        await onSubmit(formData); // Call the provided onSubmit function
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error submitting customer:", error);
      // Handle errors more gracefully (e.g., display an error message to the user)
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "#fff",
          padding: "2rem",
          color: "black",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Customer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contact Name"
            fullWidth
            margin="normal"
            required
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
          />
          <TextField
            label="Contact Number"
            fullWidth
            margin="normal"
            required
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <TextField
            label="Site No."
            fullWidth
            multiline
            rows={3}
            margin="normal"
            name="siteNo"
            value={formData.siteNo}
            onChange={handleChange}
          />
          <TextField
            label="GST No."
            fullWidth
            multiline
            rows={3}
            margin="normal"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="outlined"
              color="black"
              onClick={onClose}
              sx={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
                height: "47px",
                padding: "0 15px",
                fontSize: "12px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit" // Add type="submit" to trigger form submission
              variant="contained"
              color="white"
              sx={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                height: "47px",
                padding: "0 15px",
                fontSize: "12px",
              }}
            >
              Add Customer
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

CustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerModal;
