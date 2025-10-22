const mongoose = require('mongoose');
require('dotenv').config(); // Necesario para acceder a process.env

const db = process.env.MONGO_URI; // Obtenemos la URL de conexión desde .env

const connectDB = async () => {
  try {
    // Nota: las opciones { useNewUrlParser, useUnifiedTopology } ya no son necesarias
    // en las versiones modernas de Mongoose, pero no hacen daño.
    await mongoose.connect(db); 
    console.log('MongoDB Conectado...'); // ¡Este es el mensaje que queremos ver!
  } catch (err) {
    console.error('ERROR AL CONECTAR A MONGODB:');
    console.error(err.message);
    // Salir del proceso si hay un error en la conexión
    process.exit(1);
  }
};

module.exports = connectDB;