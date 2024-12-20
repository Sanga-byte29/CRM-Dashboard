import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CustomerModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Customer
        </Typography>
        <form>
          <TextField label="Email" fullWidth margin="normal" required />
          <TextField label="Contact Name" fullWidth margin="normal" required />
          <TextField label="Contact Number" fullWidth margin="normal" required />
          <TextField label="Site No." fullWidth multiline rows={3} margin="normal" />
          <TextField label="GST No." fullWidth multiline rows={3} margin="normal" />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="outlined"
              color="black"
              onClick={onClose}
              style={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
                height: "47px", // Match the height of the Autocomplete
                padding: "0 15px",
                fontSize: "12px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="white"
              onClick={onClose}
              style={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
                height: "47px", // Match the height of the Autocomplete
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
};

export default CustomerModal;
