const mongoose = require('mongoose');
const Barra = require('./Models/Barra'); 
const data = require('../my-app/src/Data/control_inventario.json');
require("dotenv").config();

// Conexión a MongoDB 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conectado a MongoDB");
    await Barra.deleteMany({});
    await Barra.insertMany(data.barra);
    console.log("Datos insertados exitosamente");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });