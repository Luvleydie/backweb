const express = require("express");
const router = express.Router();
const Barra = require("../Models/Barra");
const Insumos = require("../Models/Insumos");

// Función auxiliar para validar el tipo de producto
const validateType = (type) => {
  if (type !== "barra" && type !== "insumos") {
    return { error: "Tipo no válido" };
  }
  return { valid: true };
};

// GET: Obtener productos según el tipo ("barra" o "insumos")
router.get("/", async (req, res) => {
  const type = req.query.type;

  if (!type) {
    return res.status(400).json({ error: "El parámetro 'type' es requerido" });
  }

  const { valid, error } = validateType(type);
  if (!valid) return res.status(400).json({ error });

  try {
    let products;
    if (type === "barra") {
      products = await Barra.find({});
    } else if (type === "insumos") {
      products = await Insumos.find({});
    }
    return res.json({ products });
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

  const { valid, error } = validateType(type);
  if (!valid) return res.status(400).json({ error });

  const productData = req.body;

  try {
    if (type === "barra") {
      if (!productData.CODIGO || isNaN(Number(productData.CODIGO))) {
        const lastProduct = await Barra.findOne({}).sort({ CODIGO: -1 });
        productData.CODIGO = lastProduct ? lastProduct.CODIGO + 1 : 1;
      }

      const requiredFields = ["DESCRIPCION", "CATEGORIA", "ALMACEN", "PROVEEDOR"];
      for (const field of requiredFields) {
        if (!productData[field] || productData[field].toString().trim() === "") {
          return res.status(400).json({
            error: `Por favor, complete todos los campos obligatorios para Barra (${requiredFields.join(", ")})`
          });
        }
      }

      const newProduct = new Barra(productData);
      const savedProduct = await newProduct.save();
      return res.status(201).json({ message: "Producto agregado", product: savedProduct });
    } else if (type === "insumos") {
      const requiredFields = ["Codigo", "Descripcion", "Categoria", "Almacen", "Proveedor"];
      for (const field of requiredFields) {
        if (!productData[field] || productData[field].toString().trim() === "") {
          return res.status(400).json({
            error: `Por favor, complete todos los campos obligatorios para Insumos (${requiredFields.join(", ")})`
          });
        }
      }

      if (!productData.Codigo || isNaN(Number(productData.Codigo))) {
        const lastProduct = await Insumos.findOne({}).sort({ Codigo: -1 });
        productData.Codigo = lastProduct ? lastProduct.Codigo + 1 : 1;
      }

      const newProduct = new Insumos(productData);
      const savedProduct = await newProduct.save();
      return res.status(201).json({ message: "Producto agregado", product: savedProduct });
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

  const { valid, error } = validateType(type);
  if (!valid) return res.status(400).json({ error });

  try {
    let updatedProduct;
    if (type === "barra") {
      updatedProduct = await Barra.findByIdAndUpdate(id, updateData, { new: true });
    } else if (type === "insumos") {
      updatedProduct = await Insumos.findByIdAndUpdate(id, updateData, { new: true });
    }

    if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
    return res.json({ message: "Producto actualizado", product: updatedProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar un producto (por ID)
router.delete("/:id", async (req, res) => {
  const type = req.query.type;
  const id = req.params.id;
  if (!type) {
    return res.status(400).json({ error: "El parámetro 'type' es requerido" });
  }

  const { valid, error } = validateType(type);
  if (!valid) return res.status(400).json({ error });

  try {
    let deletedProduct;
    if (type === "barra") {
      deletedProduct = await Barra.findByIdAndDelete(id);
    } else if (type === "insumos") {
      deletedProduct = await Insumos.findByIdAndDelete(id);
    }

    if (!deletedProduct) return res.status(404).json({ error: "Producto no encontrado" });
    return res.json({ message: "Producto eliminado", product: deletedProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
