import express from 'express';
import {
    getAllPrestamos,
    getPrestamosByCuenta,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
} from '../controllers/prestamo.controller.js';

const router = express.Router();

// GET /api/prestamos - Obtener todos los préstamos
router.get('/', getAllPrestamos);

// GET /api/prestamos/:id - Obtener un préstamo por ID
router.get('/:id', getPrestamoById);

// GET /api/prestamos/cuenta/:idCuenta - Obtener préstamos por cuenta
router.get('/cuenta/:idCuenta', getPrestamosByCuenta);

// POST /api/prestamos - Crear un nuevo préstamo
router.post('/', createPrestamo);

// PUT /api/prestamos/:id - Actualizar un préstamo
router.put('/:id', updatePrestamo);

// DELETE /api/prestamos/:id - Eliminar un préstamo
router.delete('/:id', deletePrestamo);

export default router;
