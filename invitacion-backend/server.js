// 1. Importar dependencias
const express = require('express');
const connectDB = require('./config/db'); // Importamos nuestra conexión a la DB
const cors = require('cors');
require('dotenv').config(); // Para poder usar las variables de .env

// 2. Crear la aplicación de Express
const app = express();

// 3. Middlewares
app.use(cors()); // Permite que tu frontend se comunique con este backend
app.use(express.json()); // Permite al servidor entender datos en formato JSON

// 4. Rutas de la API
// Cuando alguien vaya a '/api/confirmar', se usarán las rutas de este archivo
app.use('/api/confirmar', require('./routes/api/Confirmaciones'));

// 5. Función para iniciar el servidor
const startServer = async () => {
  try {
    // 1. INTENTAR CONECTAR A LA BASE DE DATOS
    await connectDB();
    
    // 2. SI LA CONEXIÓN ES EXITOSA, INICIAR EL SERVIDOR
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
      // El mensaje de 'MongoDB Conectado...' (de db.js) debería aparecer JUSTO ANTES de este.
    });

  } catch (error) {
    // 3. SI LA CONEXIÓN FALLA, ATRAPAR EL ERROR Y MOSTRARLO
    console.error('ERROR: No se pudo conectar a la base de datos.');
    console.error(error.message);
    process.exit(1); // Salir del programa con error
  }
};

// 6. Ejecutar la función para iniciar todo
startServer();
