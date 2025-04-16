const multer = require('multer');
const path = require('path');

// Configuración de multer para manejar archivos subidos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Función que maneja la solicitud POST para enviar el comprobante
module.exports = (req, res) => {
  if (req.method === 'POST') {
    upload.single('comprobante')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al cargar el archivo.' });
      }

      const { nombreUsuario, carrito } = req.body;
      const comprobanteArchivo = req.file;

      if (!nombreUsuario || !carrito || !comprobanteArchivo) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
      }

      // Aquí podrías procesar la compra, guardarla en una base de datos, etc.
      console.log('Compra procesada:', { nombreUsuario, carrito, comprobante: comprobanteArchivo });

      return res.status(200).json({ success: true, message: 'Compra procesada correctamente' });
    });
  } else {
    res.status(405).json({ success: false, message: 'Método no permitido' });
  }
};
