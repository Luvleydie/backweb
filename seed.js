const mongoose = require('mongoose');
const Barra = require('./Models/Barra'); // Asegúrate de que la ruta sea correcta
const data = require('../my-app/src/Data/control_inventario.json');
require("dotenv").config();

// Conexión a MongoDB (asegúrate de tener MONGO_URI en tu .env)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conectado a MongoDB");
    // Eliminar datos existentes (opcional)
    await Barra.deleteMany({});
    // Insertar nuevos datos (accede a data.barra si tu JSON tiene esa propiedad)
    await Barra.insertMany(data.barra);
    console.log("Datos insertados exitosamente");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });