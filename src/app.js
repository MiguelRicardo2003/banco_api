import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

// Cargar variables de entorno
dotenv.config({ path: '../.env' });

// Importar rutas (todas con .js)
import cuentahabienteRoutes from './routers/cuentahabiente.route.js';
import cuentaRoutes from './routers/cuenta.route.js';
import movimientoRoutes from './routers/movimiento.route.js';
import sucursalRoutes from './routers/sucursal.route.js';
import prestamoRoutes from './routers/prestamo.route.js';
import ciudadRoutes from './routers/ciudad.route.js';
import tipoDocumentoRoutes from './routers/tipoDocumento.route.js';
import tipoCuentaRoutes from './routers/tipoCuenta.route.js';
import tipoSucursalRoutes from './routers/tipoSucursal.route.js';
import tipoMovimientoRoutes from './routers/tipoMovimiento.route.js';
import titularRoutes from './routers/titular.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API del Banco BBVA',
    version: '1.0.0',
    endpoints: {
      cuentahabientes: '/api/cuentahabientes',
      cuentas: '/api/cuentas',
      movimientos: '/api/movimientos',
      sucursales: '/api/sucursales',
      prestamos: '/api/prestamos',
      ciudades: '/api/ciudades',
      tipoDocumentos: '/api/tipo-documentos',
      tipoCuentas: '/api/tipo-cuentas',
      tipoSucursales: '/api/tipo-sucursales',
      tipoMovimientos: '/api/tipo-movimientos',
      titulares: '/api/titulares'
    }
  });
});

// RUTAS API
app.use('/api/cuentahabientes', cuentahabienteRoutes);
app.use('/api/cuentas', cuentaRoutes);
app.use('/api/movimientos', movimientoRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/prestamos', prestamoRoutes);
app.use('/api/ciudades', ciudadRoutes);
app.use('/api/tipo-documentos', tipoDocumentoRoutes);
app.use('/api/tipo-cuentas', tipoCuentaRoutes);
app.use('/api/tipo-sucursales', tipoSucursalRoutes);
app.use('/api/tipo-movimientos', tipoMovimientoRoutes);
app.use('/api/titulares', titularRoutes);

// RUTA 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// INICIAR SERVIDOR
app.listen(PORT, async () => {
  console.log(`\nServidor del Banco BBVA ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación de la API: http://localhost:${PORT}/\n`);

  // Probar conexión a la base de datos
  await testConnection();
});

export default app;
