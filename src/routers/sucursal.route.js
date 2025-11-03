import express from 'express';
import {
    getAllSucursales,
    getSucursalById,
    createSucursal,
    updateSucursal,
    deleteSucursal
} from '../controllers/sucursal.controller.js';

const router = express.Router();

// GET /api/sucursales - Obtener todas las sucursales
router.get('/', getAllSucursales);

// GET /api/sucursales/:id - Obtener una sucursal por ID
router.get('/:id', getSucursalById);

// POST /api/sucursales - Crear una nueva sucursal
router.post('/', createSucursal);

// PUT /api/sucursales/:id - Actualizar una sucursal
router.put('/:id', updateSucursal);

// DELETE /api/sucursales/:id - Eliminar una sucursal
router.delete('/:id', deleteSucursal);

export default router;
