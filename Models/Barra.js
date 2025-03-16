// Models/Barra.js
const mongoose = require("mongoose");

const BarraSchema = new mongoose.Schema({
  CODIGO: { type: Number, required: false }, // Ya no es obligatorio
  DESCRIPCION: { type: String, required: true },
  CATEGORIA: { type: String, required: true },
  ALMACEN: { type: String, required: true },
  PROVEEDOR: { type: String, required: true },
  UDM: { type: String },
  ENTRADA: { type: Number, default: 0 },
  STOCK: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Barra", BarraSchema);
