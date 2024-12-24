import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import PropTypes from "prop-types";

const ViewModal = ({ order }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "white",
        }}
      >
        View
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%", // 80% of the viewport width for responsiveness
            maxWidth: "1000px", // Ensure it doesn't exceed 1000px
            backgroundColor: "#fff",
            padding: "2rem",
            color: "black",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Modal Header */}
          <Typography id="modal-title" variant="h3" component="h2" textAlign="center" gutterBottom>
            Order Details
          </Typography>

          {/* Modal Content */}
          <Grid container spacing={8}>
            {/* Row 1 */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>order:</strong> {order?.id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Customer Name:</strong> {order?.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Quotation Number:</strong> {order?.quotationNumber}
              </Typography>
            </Grid>

            {/* Row 2 */}
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Email:</strong> {order?.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {order?.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
// Define PropTypes for validation
ViewModal.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    quotationNumber: PropTypes.string,
    email: PropTypes.string,

    phoneNumber: PropTypes.string,
  }).isRequired, // Mark as required
};

export default ViewModal;
