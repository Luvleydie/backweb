const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const almacenRoutes = require("./Routes/almacen");
const paymentRoutes = require("./Routes/Payment"); // Agregamos las rutas de payment
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/almacen", almacenRoutes);
app.use("/api/payment", paymentRoutes); // Usamos la ruta de payment

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
