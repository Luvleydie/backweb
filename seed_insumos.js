// seed_insumos.js
const mongoose = require("mongoose");
const Insumos = require("./Models/Insumos"); // Asegúrate de que la ruta sea correcta
const insumosData = require("../my-app/src/Data/control_inventario_insumos.json"); // Asegúrate de que tu JSON tenga la estructura correcta

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conectado a MongoDB");
    // Opcional: elimina datos previos
    await Insumos.deleteMany({});
    // Inserta los datos. Si tu JSON tiene la propiedad "insumos", úsala; de lo contrario, usa el JSON directamente.
    const insumosArray = insumosData.insumos || insumosData;
    await Insumos.insertMany(insumosArray);
    console.log("Datos de insumos insertados exitosamente");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });
