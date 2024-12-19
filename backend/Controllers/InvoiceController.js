const Invoice = require("../Models/invoices");

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { orderId, invoiceId, invoiceNumber, invoiceDate } = req.body;

    //creating a new  invoice document
    const newInvoice = new Invoice({
      orderId,
      invoiceId,
      invoiceNumber,
      invoiceDate,
    });

    //saving it to the db
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: err.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("orderId");
    res.status(200).json(invoices);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: err.message });
  }
};
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id).populate("orderId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoice", error: err.message });
  }
};
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, invoiceId, invoiceNumber, invoiceDate } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { orderId, invoiceId, invoiceNumber, invoiceDate },
      { new: true, runValidators: true } //givesus the  updated document and validates
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating invoice", error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res
      .status(200)
      .json({ message: "Invoice deleted successfully", deletedInvoice });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting invoice", error: err.message });
  }
};
