const Payment = require("../Models/payments");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const {
      orderId,
      paymentType,
      paymentDate,
      paymentMethod,
      amountReceived,
      notes,
    } = req.body;

    const newPayment = new Payment({
      orderId,
      paymentType,
      paymentDate,
      paymentMethod,
      amountReceived,
      notes,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating payment", error: err.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId");
    res.status(200).json(payments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching payments", error: err.message });
  }
};

// Get a specific payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id).populate("orderId");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching payment", error: err.message });
  }
};

// Update a specific payment by ID
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderId,
      paymentType,
      paymentDate,
      paymentMethod,
      amountReceived,
      notes,
    } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        orderId,
        paymentType,
        paymentDate,
        paymentMethod,
        amountReceived,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating payment", error: err.message });
  }
};

// Delete a specific payment by ID
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res
      .status(200)
      .json({ message: "Payment deleted successfully", deletedPayment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting payment", error: err.message });
  }
};