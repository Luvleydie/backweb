const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  nameOnCard: { type: String, required: true },
  cvv: { type: String, required: true },
  expiry: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
