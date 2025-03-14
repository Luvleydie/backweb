// routes/payment.js
const express = require("express");
const router = express.Router();
const Payment = require("../Models/Payment");

// Endpoint para guardar los datos de la tarjeta
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

// Endpoint para obtener los detalles de pago de un usuario mediante su userId
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

// Endpoint para actualizar la información de pago de un usuario existente
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

    // Actualizar los detalles de pago
    if (cardNumber) payment.cardNumber = cardNumber;
    if (nameOnCard) payment.nameOnCard = nameOnCard;
    if (cvv) payment.cvv = cvv;
    if (expiry) payment.expiry = expiry;

    const updatedPayment = await payment.save(); // Guardar cambios
    res.json({ message: "Información de pago actualizada", payment: updatedPayment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
