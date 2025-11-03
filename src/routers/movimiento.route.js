import express from 'express';
import {
  getAllMovimientos,
  getMovimientosByCuenta,
  createMovimiento,
  getMovimientoById
} from '../controllers/movimiento.controller.js';

const router = express.Router();

// GET /api/movimientos - Obtener todos los movimientos
router.get('/', getAllMovimientos);

// GET /api/movimientos/:id - Obtener un movimiento por ID
router.get('/:id', getMovimientoById);

// GET /api/movimientos/cuenta/:idCuenta - Obtener movimientos por cuenta
router.get('/cuenta/:idCuenta', getMovimientosByCuenta);

// POST /api/movimientos - Crear un nuevo movimiento (depósito/retiro)
router.post('/', createMovimiento);

export default router;
