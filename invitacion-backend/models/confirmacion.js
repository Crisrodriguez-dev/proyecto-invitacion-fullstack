const mongoose = require('mongoose');

// Este es el "molde" de cómo se guardarán los datos en la base de datos
const ConfirmacionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, // El nombre es obligatorio
    trim: true      // Quita espacios en blanco al inicio y al final
  },
  confirma: {
    type: String,
    required: true // La confirmación es obligatoria
  },
  cancion: {
    type: String,
    trim: true,
    default: 'No sugirió canción' // Un valor por defecto si no envían nada
  },
  fecha: {
    type: Date,
    default: Date.now // La fecha se pone automáticamente
  }
});

module.exports = mongoose.model('confirmacion', ConfirmacionSchema);