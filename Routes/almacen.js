// routes/almacen.js
const express = require("express");
const router = express.Router();
const Barra = require("../Models/Barra");
const Insumos = require("../Models/Insumos");

// GET: Obtener productos según el tipo ("barra" o "insumos")
router.get("/", async (req, res) => {
  const type = req.query.type;
  if (!type) {
    return res.status(400).json({ error: "El parámetro 'type' es requerido" });
  }
  try {
    if (type === "barra") {
      const products = await Barra.find({});
      return res.json({ products });
    } else if (type === "insumos") {
      const products = await Insumos.find({});
      return res.json({ products });
    } else {
      return res.status(400).json({ error: "Tipo no válido. Debe ser 'barra' o 'insumos'" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST: Agregar un nuevo producto
router.post("/", async (req, res) => {
  const type = req.query.type;
  if (!type) {
    return res.status(400).json({ error: "El parámetro 'type' es requerido" });
  }
  const productData = req.body;
  try {
    if (type === "barra") {
      // Crear producto de tipo Barra
      const newProduct = new Barra(productData);
      const savedProduct = await newProduct.save();
      return res.status(201).json({ message: "Producto agregado", product: savedProduct });
    } else if (type === "insumos") {
      // Crear producto de tipo Insumos
      const newProduct = new Insumos(productData);
      const savedProduct = await newProduct.save();
      return res.status(201).json({ message: "Producto agregado", product: savedProduct });
    } else {
      return res.status(400).json({ error: "Tipo no válido. Debe ser 'barra' o 'insumos'" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT: Actualizar un producto (por ID)
router.put("/:id", async (req, res) => {
  const type = req.query.type;
  const id = req.params.id;
  const updateData = req.body;
  if (!type) {
    return res.status(400).json({ error: "El parámetro 'type' es requerido" });
  }
  try {
    if (type === "barra") {
      const updatedProduct = await Barra.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.json({ message: "Producto actualizado", product: updatedProduct });
    } else if (type === "insumos") {
      const updatedProduct = await Insumos.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.json({ message: "Producto actualizado", product: updatedProduct });
    } else {
      return res.status(400).json({ error: "Tipo no válido. Debe ser 'barra' o 'insumos'" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar un producto (opcional)
router.delete("/:id", async (req, res) => {
  const type = req.query.type;
  const id = req.params.id;
  if (!type) {
    return res.status(400).json({ error: "El parámetro 'type' es requerido" });
  }
  try {
    if (type === "barra") {
      await Barra.findByIdAndDelete(id);
      return res.json({ message: "Producto eliminado" });
    } else if (type === "insumos") {
      await Insumos.findByIdAndDelete(id);
      return res.json({ message: "Producto eliminado" });
    } else {
      return res.status(400).json({ error: "Tipo no válido. Debe ser 'barra' o 'insumos'" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
