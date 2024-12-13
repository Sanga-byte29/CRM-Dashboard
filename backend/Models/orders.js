const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    orderDate: { type: Date, required: true },
    bookedBy: { type: String, default: "Administrator" },
    startDate: { type: Date, required: true },
    completionDate: { type: Date, required: true },
    paymentDueDate: { type: Date },
    projectHead: { type: String, required: true },
    customer: { type: String, required: true },
    contactPerson: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    address: { type: String },
    gstNumber: { type: String },
    billTo: { type: String },
    quotationNumber: { type: String },
    quotationDate: { type: Date },
    poNumber: { type: String },
    poDate: { type: Date },
    transportationCost: { type: Number, default: 0 },
    amountWithGST: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
