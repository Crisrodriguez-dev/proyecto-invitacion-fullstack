const express = require('express');
const router = express.Router();
// Importamos el modelo
// ¡¡AQUÍ ESTÁ LA CORRECCIÓN!! Necesita subir dos niveles (../../)
const Confirmacion = require('../../models/confirmacion'); 

// @route   POST /api/confirmar
// @desc    Recibe y guarda una nueva confirmación
// @access  Public
router.post('/', async (req, res) => {
  // Extraemos los datos que envía el frontend del "body" de la petición
  const { nombre, confirma, cancion } = req.body;

  // Verificación básica
  if (!nombre || !confirma) {
    return res.status(400).json({ msg: 'Por favor, incluye un nombre y una confirmación.' });
  }

  try {
    // Creamos un nuevo documento usando el modelo
    const nuevaConfirmacion = new Confirmacion({
      nombre,
      confirma,
      cancion
    });

    // Lo guardamos en la base de datos
    const confirmacionGuardada = await nuevaConfirmacion.save();

    // Respondemos al frontend que todo salió bien
    res.status(201).json({ msg: 'Confirmación guardada con éxito', data: confirmacionGuardada });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
});

module.exports = router;