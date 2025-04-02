const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(cors({
    origin: '*',  // Permitir solicitudes desde cualquier origen
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Crear la carpeta "uploads" si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuración de Multer para almacenar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');  // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generar nombre único
    }
});

const upload = multer({ storage: storage });

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para recibir la compra con comprobante de pago
app.post('/confirmar-compra', upload.single('comprobante'), (req, res) => {
    try {
        const nombreUsuario = req.body.nombreUsuario;
        const carrito = JSON.parse(req.body.carrito);  // Convertir el carrito a JSON
        const archivoComprobante = req.file ? req.file.filename : null;

        console.log('Datos recibidos:', { nombreUsuario, carrito, archivoComprobante });

        if (!nombreUsuario || !carrito || !archivoComprobante) {
            return res.status(400).json({ success: false, message: "Faltan datos." });
        }

        // Simular almacenamiento en base de datos (aquí puedes guardar en Firebase, MongoDB, etc.)
        res.json({ success: true, message: 'Compra procesada correctamente', comprobante: archivoComprobante });

    } catch (error) {
        console.error('Error en la compra:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
