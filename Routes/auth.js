// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../Models/User"); // Asegúrate de que la ruta y mayúsculas coincidan
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Crear nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Usuario registrado", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan credenciales" });
    }
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }
    // Generar token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Inicio de sesión exitoso", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar perfil
// Nota: En producción, protege esta ruta con middleware que verifique el token JWT.
router.put("/profile", async (req, res) => {
  try {
    const { userId, username, profileImage,phone } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Falta el userId" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profileImage,phone },
      { new: true }
    );
    res.json({ message: "Perfil actualizado", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
