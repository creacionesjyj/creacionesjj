// api/orden.js

module.exports = (req, res) => {
  if (req.method === 'POST') {
      // Obtener los datos del cuerpo de la solicitud
      const { usuario, carrito, comprobante } = req.body;

      if (!usuario || !carrito || !comprobante) {
          return res.status(400).json({ error: 'Faltan datos en la solicitud' });
      }

      // Simular el almacenamiento de la orden
      console.log('📦 Nueva orden recibida:', { usuario, carrito, comprobante });

      // Enviar una respuesta de éxito
      return res.status(200).json({ mensaje: 'Orden recibida correctamente', datos: { usuario, carrito, comprobante } });
  } else {
      // Si la solicitud no es POST, devolver un error
      return res.status(405).json({ error: 'Método no permitido' });
  }
};
