// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  nameOnCard: { type: String, required: true },
  cvv: { type: String, required: true },
  expiry: { type: String, required: true },
  // Opcional: puedes guardar el ID del usuario que realiza el pago
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
