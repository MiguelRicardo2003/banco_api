import express from "express";
import {
  getAllCuentas,
  getCuentaById,
  createCuenta,
  updateCuenta,
  deleteCuenta,
  getSaldoCuenta,
} from "../controllers/cuenta.controller.js";

const router = express.Router();

// GET /api/cuentas - Obtener todas las cuentas
router.get("/", getAllCuentas);

// GET /api/cuentas/:id - Obtener una cuenta por ID
router.get("/:id", getCuentaById);

// GET /api/cuentas/:id/saldo - Obtener el saldo de una cuenta
router.get("/:id/saldo", getSaldoCuenta);

// POST /api/cuentas - Crear una nueva cuenta
router.post("/", createCuenta);

// PUT /api/cuentas/:id - Actualizar una cuenta
router.put("/:id", updateCuenta);

// DELETE /api/cuentas/:id - Eliminar una cuenta
router.delete("/:id", deleteCuenta);

export default router;
