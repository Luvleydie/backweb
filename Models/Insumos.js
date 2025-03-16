const mongoose = require("mongoose");

const InsumosSchema = new mongoose.Schema({
  Codigo: { type: Number, required: true },
  Descripcion: { type: String, required: true },
  Categoria: { type: String, required: false },
  Almacen: { type: String, required: false },
  Proveedor: { type: String, required: false },
  Stock_minimo: { type: Number, default: 0 },
  Inventario: { type: Number, default: 0 },
  Estatus: { type: String },
  UnidadDM: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Insumos", InsumosSchema);
