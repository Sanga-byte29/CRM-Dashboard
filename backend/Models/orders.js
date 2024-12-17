const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    orderDate: { type: Date, required: true },
    bookedBy: { type: String, default: "Administrator", required: true },
    startDate: { type: Date, required: true },
    completionDate: { type: Date, required: true },
    paymentDueDate: { type: Date, required: true },
    projectHead: { type: String },
    customer: { type: String, required: true },
    contactPerson: { type: String },
    mobileNumber: { type: String },
    email: { type: String, required: true },
    address: { type: String },
    gstNumber: { type: String },
    billTo: { type: String },
    quotationNumber: { type: String },
    quotationDate: { type: Date, required: true },
    poPiNumber: { type: String },
    poPiDate: { type: Date },
    transportationCost: { type: Number, default: 0 },
    amountWithGST: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
