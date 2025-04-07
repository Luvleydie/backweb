const express = require("express");
const router = express.Router();
const Payment = require("../Models/Payment");

// Crear detalles de pago
router.post("/", async (req, res) => {
  try {
    const { cardNumber, nameOnCard, cvv, expiry, userId } = req.body;
    if (!cardNumber || !nameOnCard || !cvv || !expiry || !userId) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const newPayment = new Payment({ cardNumber, nameOnCard, cvv, expiry, userId });
    const savedPayment = await newPayment.save();
    res.status(201).json({ message: "Detalles de pago guardados", payment: savedPayment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener detalles de pago para un usuario
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Falta el userId" });
    }
    const payment = await Payment.findOne({ userId });
    if (!payment) {
      return res.status(404).json({ error: "No se encontraron detalles de pago para este usuario" });
    }
    res.json({ payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar detalles de pago
router.put("/", async (req, res) => {
  try {
    const { userId, cardNumber, nameOnCard, cvv, expiry } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Falta el userId" });
    }
    const payment = await Payment.findOne({ userId });
    if (!payment) {
      return res.status(404).json({ error: "No se encontraron detalles de pago para este usuario" });
    }
    if (cardNumber) payment.cardNumber = cardNumber;
    if (nameOnCard) payment.nameOnCard = nameOnCard;
    if (cvv) payment.cvv = cvv;
    if (expiry) payment.expiry = expiry;
    const updatedPayment = await payment.save();
    res.json({ message: "Información de pago actualizada", payment: updatedPayment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
